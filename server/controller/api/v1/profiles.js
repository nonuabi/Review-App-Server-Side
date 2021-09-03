const jwt = require("jsonwebtoken");
const User = require("../../../models/users");
const dotenv = require("dotenv").config();
module.exports.timeLine = function (req, res) {
  console.log("hello timeline page ");
  res.send(req.rootUser);
};
module.exports.personal = function (req, res) {
  console.log("root.user ", req.rootUser);
  return res.status(200).json({
    name: req.rootUser.name,
    email: req.rootUser.email,
    profileImage: req.rootUser.profileImage,
  });
};
