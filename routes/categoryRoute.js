const express=require('express')
const route=express.Router()
const {requireSignIn,isAdmin}=require('../middlewares/authMiddleware')
const {createCategoryController,updateCategoryController,getAllCategoryController,getSingleCategoryController,deleteCategory}  = require('../controllers/categoryController')

//routes
//create category
route.post("/create-category",requireSignIn,isAdmin,createCategoryController)

//update category
route.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)

//getAll category
route.get("/get-category",getAllCategoryController)

//get single category
route.get("/get-single-category/:slug",getSingleCategoryController)

//delete category
route.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategory)


module.exports = route ;
