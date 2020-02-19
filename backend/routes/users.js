const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/users.model");
const jwtSecret = process.env.JWT_SECRET;

router.route("/add").post((req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Please enter all fields");
  }

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json("User already exist");

    const newUser = new User({
      name,
      email,
      password
    });

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user =>
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
          )
        );
      });
    });
  });
});

module.exports = router;
