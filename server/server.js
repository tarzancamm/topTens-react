// Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT } = process.env || 4999;
const { db } = require("./database");

// Store express in variable
const server = express();

// Import middleware functions

// Middleware
server.use(express.json()) // Parse all incoming requests into JSON
server.use(cors()) // Client & Server can run on seperate ports

// Table associations (relations)

// Endpoints

// {force: true} to drop tables
db.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
});
