"use strict";

require("dotenv").config();
const express = require("express");
//const logger = require("morgan");
const app = express();
const port = 3001;

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// log
//app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Hello Housekeepers!");
});

app.use("/api/user", require("./controllers/user"));
app.use("/api/person", require("./controllers/person"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
