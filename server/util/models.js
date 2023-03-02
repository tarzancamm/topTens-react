const { DataTypes } = require("sequelize");
const { db } = require("./database");

module.exports = {
  User: db.define("user", {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    email_address: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    hashed_pass: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }),
  MovieList: db.define("movielist", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    movieId: {
        allowNull: false,
        type: DataTypes.STRING,
    }
  })
};
