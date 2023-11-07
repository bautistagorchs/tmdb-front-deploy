const express = require("express");
const router = express.Router();
const User = require("../db/models/User");
const { generateToken, validateToken } = require("../config/token");
const { validateAuth } = require("../config/auth");

// see all users
// router.get("/", (req, res) => {
//   User.findAll()
//     .then((users) => res.status(200).send(users))
//     .catch((err) => console.error(err));
// });

// register new user
router.post("/register", (req, res) => {
  User.create(req.body).then((newUser) => res.status(201).send(newUser));
});

// login with existing user
router.post("/login", (req, res) => {
  // find one user via email
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    // if doesn`t exist sendStatus 401
    if (!user) return res.status(401).send("no se pudo encontrar al usuario");

    // validate hasedPassword
    user.validatePassword(req.body.password).then((match) => {
      if (!match) return res.sendStatus(401);
      // set payload to send to client
      const payload = {
        email: user.email,
        name: user.name,
        last_name: user.last_name,
      };
      const token = generateToken(payload);
      res.cookie("token", token);
      res.send(payload);
    });
  });
});
router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.use("/", (req, res) => res.sendStatus(404));

module.exports = router;
