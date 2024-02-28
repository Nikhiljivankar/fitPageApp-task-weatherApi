const catchAsync = require("../utils/catchAsync");
const locationModel = require("../model/location");
const ErrorResponse = require("../utils/errorResponse");
const successResponse = require("../utils/successResponse");
const pagination = require("../utils/pagination");
const metaData = require("../utils/metaDataResponse");

exports.Create = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.latitude || !req.body.longitude) {
    return next(
      new ErrorResponse(
        "Please Provide required fields like name, latitude, longitude",
        400
      )
    );
  }
  const isExist = await locationModel.findOne(req.body);
  if (isExist) {
    return next(new ErrorResponse("Location Already Exist", 400));
  }
  const newLocation = new locationModel(req.body);
  const createdLocation = await newLocation.save();

  res
    .status(201)
    .json(successResponse(createdLocation, 1, "success", 201, metaData()));
});

exports.GetAll = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query?.page) || 1;
  const limit = parseInt(req.query?.limit) || 20;
  const sort = req.query.sort ?? "-createdAt";
  const Location = await locationModel
    .find({})
    .sort(sort)
    .skip(pagination(page, limit))
    .limit(limit);
  const LocationCount = await locationModel.find({}).count();
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

exports.Update = catchAsync(async (req, res, next) => {
  const LocationData = await locationModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );
  if (!LocationData) return next(new ErrorResponse("Record not found", 404));
  return res
    .status(200)
    .json(
      successResponse(
        LocationData,
        1,
        "Location Updated Successfully",
        200,
        metaData()
      )
    );
});

exports.deleteLocation = catchAsync(async (req, res) => {
  const { id } = req.params;
  await locationModel.deleteOne({ _id: id });
  res
    .status(200)
    .json(successResponse({}, 1, "successfully deleted", 200, metaData()));
});

exports.getByID = catchAsync(async (req, res, next) => {
  const record = await locationModel.findById(req.params.id);

  if (!record) {
    return next(
      new ErrorResponse(`Location not found for id ${req.params.id}`, 404)
    );
  }

  return res
    .status(200)
    .json(successResponse(record, 1, "Record found", 200, metaData()));
});
