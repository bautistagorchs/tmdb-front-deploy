const S = require("sequelize");
const db = require("../index");
const bcrypt = require("bcrypt");

class Users extends S.Model {
  hash(password, salt) {
    // console.log(
    //   "soy el console log del static, y recibo un password:",
    //   password,
    //   "y un salt:",
    //   salt
    // );
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
    username: {
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

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  // console.log("soy el salt generado por la funcion Sync", salt);
  user.salt = salt;
  return user.hash(user.password, salt).then((hash) => {
    // console.log(
    //   "y yo estoy adentro del return, y puedo mostrar que es el hash:",
    //   hash
    // );
    user.password = hash;
  });
});

module.exports = Users;
