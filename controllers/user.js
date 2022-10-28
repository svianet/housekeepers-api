"use strict";

const express = require("express");
const api = express.Router();

api.get("/", function (req, res) {
  res.send("Hello USER API route.");
});

api.get("/:id", function (req, res) {
  let { id } = req.params;
  res.send(`Person: ${id}`);
});

module.exports = api;
