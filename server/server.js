// Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT } = process.env || 4999;
const { db } = require("./util/database");
const {User, MovieList} = require('./util/models')


// Store express in variable
const server = express();

// Import middleware functions
const {register, login} = require('./controllers/auth')
const {addTopTen, getTopTen} = require('./controllers/topTen')

// Middleware
server.use(express.json()); // Parse all incoming requests into JSON
server.use(cors()); // Client & Server can run on seperate ports

// Table associations (relations)
User.hasOne(MovieList)
MovieList.belongsTo(User)

// Endpoints
server.post('/register', register)
server.post('/login', login)
server.post('/profile/:userId', addTopTen)
server.get('/profile/:userId', getTopTen)

// {force: true} within sync() to drop tables
db.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
});
