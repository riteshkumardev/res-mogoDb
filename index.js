const express = require("express");
var app = express();
// const morgan = require("morgan");
const bodyParser = require("body-parser");
// const productRoutes = require("./api/routes/products");
// const orderRoutes = require("./api/routes/orders");
// const auditRoutes = require("./api/routes/audit");

const userRoutes = require("./routes/signUp");
const mongoose = require("mongoose");
var cors = require("cors");
mongoose.connect(
  "mongodb+srv://expelee:expelee@cluster0.emvn8dw.mongodb.net/?retryWrites=true&w=majority"
);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
// app.use(morgan("dev"));

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
//extract json data
app.use(bodyParser.json());
//routes which can handle request

// app.use("/products", productRoutes);
// app.use("/order", orderRoutes);
// app.use("/api/auditReport", auditRoutes);

app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error?.message,
    },
  });
});

module.exports = app;
