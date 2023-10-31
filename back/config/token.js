const jwt = require("jsonwebtoken");
const SECRET = "potatopizza";

function generateToken(payload) {
  const token = jwt.sign(payload, SECRET, { expiresIn: "2d" });
  return token;
}

function validateToken() {}

module.exports = { generateToken, validateToken };
