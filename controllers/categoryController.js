const slugify = require('slugify')
const Category=require('../models/categoryModel')
const categoryModel=require('../models/categoryModel')

const createCategoryController=async(req,res)=>{
    try{
        const {name}= req.body
        if(!name) { 
            return 'Name is required'
        } 
        const  existingcategory= await categoryModel.findOne({name});
        if(existingcategory){
            return res.status(200).send({
                success: true,
                message: 'Category Already Exisits'
            })
        }
        const category = await new categoryModel({name,slug: slugify(name)}).save();
        res.status(200).send({
            success:true,
            message:"New Category Created",
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            err,
            message:"Error in category",
        })
    }
}

// update category
const updateCategoryController=async(req,res)=>{
    try {
        const { name }= req.body;
        const { id }= req.params;

        const category= await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) } ,
            { new: true }
        );
        res.status(200).send({
            success: true,
            mesaage:"Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(err)
        res.status(500).send({
            success:false,
            err,
            message:"Error in category",
        })
    }
}


//get All category
const getAllCategoryController=async(req,res)=>{
    try {
        const category= await Category.find({})
        res.status(200).send({
            success: true,
            mesaage:" Get All Category Successfully",
            category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all category",
        })
    }
}

//get single category
const getSingleCategoryController=async(req,res)=>{
    try {
        const category= await Category.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            mesaage:" Get Single Category Successfully",
            category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single category",
        })
    }
}

//delete category
const deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const category= await Category.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            mesaage:" Delete Category Successfully",
            category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while delete category",
        })
    }
}

module.exports={createCategoryController,updateCategoryController,getAllCategoryController,getSingleCategoryController,deleteCategory}