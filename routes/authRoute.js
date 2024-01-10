const express = require("express");
const route = express.Router();
const {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

//routing
//Register || method: POST
route.post("/register", registerController);

//Login || method: POST
route.post("/login", loginController);

//test routes
route.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
route.get("/user-auth", requireSignIn, (req,res)=>{
  res.status(200).send({ok:true})
});

//protected admin route auth
route.get("/admin-auth", requireSignIn, isAdmin,(req,res)=>{
  res.status(200).send({ok:true})
});

//update profile
route.put("/profile", requireSignIn, updateProfileController);

//orders
route.get("/orders", requireSignIn, getOrdersController);

// get all orders for admin
route.get("/all-orders", requireSignIn,isAdmin, getAllOrdersController);

// update order status by admin
route.put("/order-status/:orderId", requireSignIn,isAdmin, orderStatusController);

module.exports = route;
