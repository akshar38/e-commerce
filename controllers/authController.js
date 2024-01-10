const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const User = require("../models/userModel");
const orderModel = require("../models/orderModel");

//POST register
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validation done in frontend

    //check user
    const existingUser = await User.findOne({ email });

    //if user already exists
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already register please login",
      });
    }

    //getting hashed pasword from authHelper.js
    const hashedPassword = await hashPassword(password);

    //register user
    const newUser = await new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "User register successfully",
      newUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      err,
    });
  }
};

//POST login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //find login user
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    //password verification
    const match = await comparePassword(password, loginUser.password);

    //if password does not match
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = await jwt.sign(
      { _id: loginUser._id },
      process.env.JWT_SECRET_KEY
    );

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: loginUser.name,
        email: loginUser.email,
        phone: loginUser.phone,
        address: loginUser.address,
        role: loginUser.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      err,
    });
  }
};

//testController
const testController = async (req, res) => {
  res.send("Protected Routes");
};

//update prfole
const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await User.findById(req.user._id);
    //password
    if (password) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};

//orders
const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};

//all orders for admin
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};

//update order status by admin
const orderStatusController = async (req, res) => {
  try{
    const {orderId} = req.params;
    const {status} = req.body;
    const orders=await orderModel.findByIdAndUpdate(orderId, { status:status }, { new: true });
    res.json(orders);
  }
  catch(err){
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Getting Orders",
        error,
      });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
};
