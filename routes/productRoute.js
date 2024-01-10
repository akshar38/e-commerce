const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getAllProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  deleteProductController,
  relatedProductController,
  productCategoryController,
  brainTreePaymentController,
  braintreeTokenController
} = require("../controllers/productController");
const route = express.Router();
const formidable = require("express-formidable");

//routes
//create product
route.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product
route.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get All products
route.get("/get-product", getAllProductController);

//get single products
route.get("/get-product/:slug", getSingleProductController);

//get product photo
route.get("/product-photo/:pid", productPhotoController);

//delete product
route.delete("/delete-product/:pid", deleteProductController);

//similar product
route.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
route.get("/product-category/:slug", productCategoryController);

//payments routes
//token
route.get("/braintree/token", braintreeTokenController);

//payments
route.post("/braintree/payment", requireSignIn, brainTreePaymentController);

module.exports = route;
