const express=require('express')
const adminAuth=require("../Middlewares/adminAuth")
const router=express.Router()

const {uploadImage}=require("../Middlewares/multer")
const {Adminlogin,adminDashboard}=require("../Controllers/AdminController")
const {addCourse,deleteCourse,getCourseById,editCourse}=require("../Controllers/CourseController")
const {addCategory, getCategory}=require("../Controllers/CategoryController")
const {getAllUser}=require("../Controllers/ListUserController")
const { disableUser } = require('../Controllers/AdminUserDisable')
const {getAllCourse}=require('../Controllers/ListCourseController')
const {getBookingHistroy,getSingleBookingDetails}=require('../Controllers/OrderController')



//POST methods

//admin login 
router.post("/login",Adminlogin)
//add course 
router.post("/addCourse",adminAuth,uploadImage('./public/Images/course/thumbnail'),addCourse)
//add category
router.post("/addCategory",adminAuth,uploadImage('./public/Images/course/category'),addCategory)
//block users
router.post('/listuser',adminAuth,disableUser)
//delete course 
router.post('/deleteCourse/:courseId',adminAuth,deleteCourse)
//edit course
router.post("/editCourse/:courseId",adminAuth,uploadImage('./public/Images/course/thumbnail'),editCourse)


//GET methods

//list user details
 router.get('/listuser',adminAuth,getAllUser)
 //list all course
 router.get('/getAllCourse',adminAuth,getAllCourse)
 //list specific course
 router.get('/courseEdit/:courseId',adminAuth,getCourseById)
 //list dashboard details
 router.get('/adminDashboard',adminAuth,adminDashboard)
 //list order details
 router.get('/bookingDetails',adminAuth,getBookingHistroy)
 //list specific order details
 router.get('/getMainBookingPage/:orderId',adminAuth,getSingleBookingDetails)
 //list category details
 router.get('/getCategoriesDetails',adminAuth,getCategory)

module.exports=router;