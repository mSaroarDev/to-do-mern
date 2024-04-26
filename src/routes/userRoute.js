const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = express.Router();
const UserModel = require("../schema/userSchema");

// register
user.post("/register", async (req, res) => {
  const formData = req.body;
  const { email, phone, password } = formData;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existUser = await UserModel.findOne({ email: email });
    if (!email || !phone || !password) {
      res.status(406).json({ msg: "missing fields" });
    } else if (password.length < 6) {
      res.status(406).json({
        msg: "weak password",
        data: "password must be greater than 6 character",
      });
    } else if (existUser) {
      res.status(409).json({ msg: "err", msg: "duplicate email" });
    } else {
      const data = new UserModel({ email, phone, password: hashedPassword });
      const response = await data.save();
      res.status(201).json({ msg: "success", data: response });
    }
  } catch (error) {
    res.status(500).json({ msg: "err", error: error });
  }
});

// user login
user.post("/login", async (req, res) => {
  const formData = req.body;
  const { email, password } = formData;

  try {
    // check the user is exist or not
    const existUser =
      (await UserModel.findOne({ email: email })) ||
      (await UserModel.findOne({ phone: email }));

    if (existUser) {
      const isValidPassword = await bcrypt.compare(
        password,
        existUser.password
      );

      if (isValidPassword) {
        const token = jwt.sign(
          { id: existUser._id.toString(), email: existUser.email },
          // { id: 1 },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        // set the token to cookie
        res.cookie("session", token);
        res.status(200).json({
          msg: "authenticated",
        });
      } else {
        res.status(401).json({
          msg: "unauthenticated",
        });
      }
    } else {
      res.status(401).json({
        msg: "unauthenticated",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "err", data: error });
  }
});

// logout api
user.get("/logout", async (req, res) => {
  try {
    res.clearCookie("session");
    res.status(200).json({ msg: "success", data: "logout success" });
  } catch (err) {
    res.status(500).json({ msg: "err", data: "internal server error" });
  }
});

module.exports = user;
