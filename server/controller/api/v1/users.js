const User = require("../../../models/users");
const jwt = require("jsonwebtoken");

//sigup api
module.exports.sigup = async function (req, res) {
  console.log("request from signup page :: ", req);
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword || !req.file.path) {
    return res.status(422).json({
      error: "please filled the field properly",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({
        error: "Email already Exist",
      });
    } else if (password !== confirmPassword) {
      return res.status(422).json({
        error: "Password are not matching",
      });
    } else {
      const user = new User({
        name,
        email,
        password,
        profileImage: req.file.path,
      });
      await user.save();
      res.status(201).json({
        message: "User registred successfully",
      });
    }
  } catch (err) {
    return res.json(500, {
      message: "Internal Server Error",
      error: err,
    });
  }
};

//login api
module.exports.login = async function (req, res) {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        error: "please filled the field properly",
      });
    }
    const userLogin = await User.findOne({ email: email });
    console.log("login user data ", userLogin);
    if (userLogin) {
      if (userLogin.password !== password) {
        return res.status(401).json({
          message: "Email/password is invalid",
        });
      }
      console.log("Email ", userLogin);
      token = await userLogin.generateAuthToken();
      console.log("at login contoller token ", token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      res.json({
        userLogin,
        message: "Login Successfully :)",
      });
    } else {
      return res.status(402).json({
        error: "Invalid Email id",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.logout = function (req, res) {
  console.log("logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
};

//update user details api
module.exports.update = function (req, res) {
  console.log(req);
  let body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      message: "You must provide a body for update",
    });
  }
};
module.exports.getUser = function (req, res) {
  console.log("login user ", req.rootUser);
  return res.send(req.rootUser);
};
