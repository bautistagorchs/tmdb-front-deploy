const express = require("express");
const router = express.Router();
const User = require("../db/models/User");
const { generateToken, validateToken } = require("../config/token");
const { validateAuth } = require("../config/auth");

router.post("/register", (req, res) => {
  User.create(req.body).then((newUser) => res.status(201).send(newUser));
});

router.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) return res.status(401).send("no se pudo encontrar al usuario");

    user.validatePassword(req.body.password).then((match) => {
      if (!match) return res.sendStatus(401);
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
router.post("/favourites", (req, res) => {
  User.update(
    { favourites: req.body.favourites },
    { where: { email: req.body.email }, returning: true }
  )
    .then(([affectedRow, updated]) => res.status(202).send(updated[0]))
    .then(() => res.send())
    .catch((err) => console.error(err));
});

router.post("/logout", validateAuth, (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
