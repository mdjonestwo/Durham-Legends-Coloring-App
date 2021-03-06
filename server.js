const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3002;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/DurhamLegendsColoringApp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
