const catchAsync = require("../utils/catchAsync");
const weatherModel = require("../model/weather");
const locationModel = require("../model/location");
const ErrorResponse = require("../utils/errorResponse");
const successResponse = require("../utils/successResponse");
const WeatherResponse = require("../utils/weatherResponse");
const pagination = require("../utils/pagination");
const metaData = require("../utils/metaDataResponse");
const axios = require("axios");
const redis = require("redis");
const moment = require("moment");
const redisClient = redis.createClient()
.on('error', err => console.log('Redis Client Error', err))
.connect();

const isValidInput = (days) => {
  const validInputs = [7, 15, 30];
  return validInputs.includes(days);
};

const isValidLocation = async (location_id) => {
  const locationData = await locationModel.findById(location_id).lean();

  if (!locationData) {
    return false;
  }
  return true;
};

exports.getAll = catchAsync(async (req, res, next) => {
  const currentDate = moment();
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 20;
  const sort = req.query.sort ?? "-createdAt";
  let day = parseInt(req.query.days);
  if (!isValidInput(day)) {
    return next(
      new ErrorResponse(
        `Please provide correct day count in 7, 15, 30 respectively`,
        404
      )
    );
  }
  let locationId = req.query.location_id;
  if (!isValidLocation(locationId)) {
    return next(
      new ErrorResponse(`Location not found for id ${req.params.id}`, 404)
    );
  }
  let previousDay = currentDate
    .clone()
    .subtract(day, "days")
    .format("YYYY-MM-DD");
  let currentDay = currentDate.clone().subtract(1, "days").format("YYYY-MM-DD");
  let query = {
    locationId,
    updatedAt: {
      $gte: new Date(previousDay),
      $lt: new Date(currentDay),
    },
  };
  const Location = await weatherModel
    .find(query ?? {})
    .sort(sort)
    .skip(pagination(page, limit))
    .limit(limit);
  const LocationCount = await locationModel.find(query ?? {}).count();
  if (Location.length == 0) {
    return res
      .status(204)
      .json(
        successResponse(
          Location,
          0,
          "no data found",
          204,
          metaData(Location.length, limit ?? 20, page ?? 1)
        )
      );
  }
  res.json(
    successResponse(
      Location,
      Location.length,
      "success",
      200,
      metaData(LocationCount, limit ?? 20, page ?? 1)
    )
  );
});

exports.history = catchAsync(async (req, res, next) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const currentDate = moment();

  const locationData = await locationModel
    .findById(req.query.location_id)
    .lean();

  if (!locationData) {
    return next(
      new ErrorResponse(
        `Location not found for id ${req.query.location_id}`,
        404
      )
    );
  }
  let day = parseInt(req.query.days);
  if (!isValidInput(day)) {
    return next(
      new ErrorResponse(
        `Please provide correct day count in 7, 15, 30 respectively`,
        404
      )
    );
  }

  let { cachedData, error } = await redisClient.get({
    data: locationData,
    history: true,
    days: "30 days",
  });
  if (error) {
    console.error("Error fetching from cache:", error);
    return res.status(500).json({ error: "Internal server error." });
  }

  if (cachedData) {
    const weatherData = JSON.parse(cachedData);
    return res
      .status(200)
      .json(successResponse(weatherData, 1, "Record found", 200, metaData()));
  }
  let location = `${locationData.latitude},${locationData.longitude}`;

  async function fetchHistoricalWeather(location, previousDay, apiKey) {
    const apiUrl = `${process.env.WEATHER_API_URL}/history.json?q=${location}&dt=${previousDay}&key=${apiKey}`;
    const response = await axios.get(apiUrl);
    return response.data;
  }

  const promises = [];

  for (let i = 1; i <= day; i++) {
    const previousDay = currentDate
      .clone()
      .subtract(i, "days")
      .format("YYYY-MM-DD");
    promises.push(fetchHistoricalWeather(location, previousDay, apiKey));
  }

  const historyData = await Promise.all(promises);

  redisClient.setEx(
    { data: locationData, history: true, days: "30 days" },
    3600,
    JSON.stringify(historyData)
  );

  return res
    .status(200)
    .json(
      successResponse(historyData, 1, "Weather forecast found", 200, metaData())
    );
});

exports.getByID = catchAsync(async (req, res, next) => {
  const locationData = await locationModel
    .findById(req.params.location_id)
    .lean();

  if (!locationData) {
    return next(
      new ErrorResponse(`Location not found for id ${req.params.id}`, 404)
    );
  }

  let { cachedData, error } = await redisClient.get(locationData);
  if (error) {
    console.error("Error fetching from cache:", error);
    return res.status(500).json({ error: "Internal server error." });
  }

  if (cachedData) {
    const weatherData = JSON.parse(cachedData);
    return res
      .status(200)
      .json(successResponse(weatherData, 1, "Record found", 200, metaData()));
  }
  let location = `${locationData.latitude},${locationData.longitude}`;
  const apiKey = process.env.WEATHER_API_KEY;
  //   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${locationId}&appid=${apiKey}`;
  const apiUrl = `${process.env.WEATHER_API_URL}/current.json?q=${location}&key=${apiKey}`;

  const response = await axios.get(apiUrl);
  const weatherData = WeatherResponse(response.data);

  redisClient.setEx(locationData, 3600, JSON.stringify(weatherData));

  const newLocation = new weatherModel({
    locationId: locationData._id,
    data: weatherData,
  });
  await newLocation.save();

  return res
    .status(200)
    .json(
      successResponse(weatherData, 1, "Weather forecast found", 200, metaData())
    );
});
