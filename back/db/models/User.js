const S = require("sequelize");
const db = require("../index");
const bcrypt = require("bcrypt");

class Users extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt)
      .then((hashedPassword) => hashedPassword === this.password)
      .catch((err) => console.error(err));
  }
}

Users.init(
  {
    email: {
      type: S.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    last_name: {
      type: S.STRING,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    favourites: {
      type: S.ARRAY(S.INTEGER),
      defaultValue: [],
    },
    favourite_actors: {
      type: S.ARRAY(S.INTEGER),
      defaultValue: [],
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "users" }
);

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;
  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = Users;
