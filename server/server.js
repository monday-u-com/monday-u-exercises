const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api = require("./src/routes/itemRouter");
const main = async () => {
  const app = express();
  var cors = require("cors");

  app.use(cors()); // Use this after the variable declaration
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/", api);

  const port = process.env.PORT || "8000";
  app.listen(port, function () {
    console.log("Running on " + port);
  });
};

main();
