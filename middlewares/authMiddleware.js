const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//token verification
const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
  }
};

//checking for Admin login
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { requireSignIn, isAdmin };
