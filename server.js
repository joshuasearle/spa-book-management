const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");

const router = require("./routers/router");

const app = express();

// Add post request url decoding
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("tiny"));

// Add angular serving
app.use("/", express.static(path.join(__dirname, "dist/Week10")));

// Connect requests to router
app.use("/", router);

// Connect to Db, and start server
const url = "mongodb://localhost:27017/fit2095";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once("open", () => {
  console.log("Database connected, server listening.");
  app.listen(8080);
});
