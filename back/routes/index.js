const express = require("express");
const router = express.Router();
const User = require("../db/models/User");

router.get("/", (req, res) => {
  User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((err) => console.error(err));
});

router.post("/post", (req, res) => {
  User.create(req.body).then((newUser) => res.status(201).send(newUser));
});

module.exports = router;
