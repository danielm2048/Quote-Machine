const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");

const User = require("../models/users.model");
const jwtSecret = process.env.JWT_SECRET;

router.route("/").post((req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Please enter all fields");
  }

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json("User does not exist");

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json("Invalid credentials");

      jwt.sign(
        { id: user.id },
        jwtSecret,
        { expiresIn: "3d" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              _id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

router.route("/user").get(auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
