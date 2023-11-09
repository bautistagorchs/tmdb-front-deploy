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
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        const existingId = user.dataValues.favourites.indexOf(
          req.body.newFavourite
        );
        existingId !== -1
          ? user.dataValues.favourites.splice(existingId, 1)
          : user.dataValues.favourites.push(req.body.newFavourite);
        User.update(
          { favourites: user.dataValues.favourites },
          {
            where: { email: req.body.email },
            returning: true,
          }
        ).then(() => res.sendStatus(201));
      } else res.status(404).send("user not found");
    })
    .catch((err) => console.error(err));
});

router.get("/favourites/exist/:email/:id", (req, res, next) => {
  User.findOne({ where: { email: req.params.email } })
    .then((user) => {
      if (user && user.dataValues.favourites) {
        if (user.dataValues.favourites.includes(parseInt(req.params.id))) {
          res.sendStatus(200);
        } else {
          next();
        }
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => res.sendStatus(500));
});

router.post("/logout", validateAuth, (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

router.get("/all", (req, res) => {
  User.findAll()
    .then((response) => res.status(200).send(response))
    .catch((err) => console.error(err));
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
