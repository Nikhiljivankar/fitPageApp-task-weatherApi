require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./utils/errorHandler");
const ErrorResponse = require("./utils/errorResponse");
const swaggerDocument = require("./docs/swagger.json");
const rateLimitMiddleware = require('./middleware/rateLimitMiddleware'); 

const app = express();

app.use(express.urlencoded({ extended: true }));

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/weatherApp";
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("Mongodb connection error");
  });

app.use(express.json());

// swagger docs
app.use(`/api/v1/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/locations", require("./routes/locationRouter"));
app.use("/api/v1/weather", rateLimitMiddleware, require("./routes/weatherRouter")); 
// app.use("/api/v1/history", require("./routes/historyRouter")); // without rate limit
app.use("/api/v1/history", rateLimitMiddleware, require("./routes/historyRouter")); 

app.all("*", (req, res, next) => {
  next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

//   app.use(errorHandler);

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "dev";

app.listen(port, () =>
  console.log(`server in running on PORT: ${port} - ENV: ${NODE_ENV}`)
);
