require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json("No token, authorization denied");

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json("Token is not valid");
  }
}

module.exports = auth;
