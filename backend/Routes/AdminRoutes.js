const express=require('express')
const adminAuth=require("../Middlewares/adminAuth")
const {uploadImage}=require("../Middlewares/multer")
const {Adminlogin,adminDashboard}=require("../Controllers/AdminController")
const {addCourse,deleteCourse,getCourseById,editCourse}=require("../Controllers/CourseController")
const {addCategory, getCategory}=require("../Controllers/CategoryController")
const {getAllUser}=require("../Controllers/ListUserController")
const { disableUser } = require('../Controllers/AdminUserDisable')
const {getAllCourse}=require('../Controllers/ListCourseController')
const {getBookingHistroy,getSingleBookingDetails}=require('../Controllers/OrderController')




const router=express.Router()



router.post("/login",Adminlogin)
router.post("/addCourse",adminAuth,uploadImage('./public/Images/course/thumbnail'),addCourse)
router.post("/addCategory",adminAuth,uploadImage('./public/Images/course/category'),addCategory)
router.post('/listuser',adminAuth,disableUser)
router.post('/deleteCourse/:courseId',adminAuth,deleteCourse)
router.post("/editCourse/:courseId",adminAuth,uploadImage('./public/Images/course/thumbnail'),editCourse)




 router.get('/listuser',adminAuth,getAllUser)
 router.get('/getAllCourse',adminAuth,getAllCourse)
 router.get('/courseEdit/:courseId',adminAuth,getCourseById)
 router.get('/adminDashboard',adminAuth,adminDashboard)
 router.get('/bookingDetails',adminAuth,getBookingHistroy)
 router.get('/getMainBookingPage/:orderId',adminAuth,getSingleBookingDetails)
 router.get('/getCategoriesDetails',adminAuth,getCategory)

module.exports=router;