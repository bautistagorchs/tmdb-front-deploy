const S = require("sequelize");
const db = require("../index");

class Users extends S.Model {}

Users.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "users" }
);

module.exports = Users;
