const express = require('express');
const { signup, login, otp, forgotPassword, forgotOtp, editPassword, resendOtp,getUserProfile,userHeader,profileChangePassword,userProfileSubmit,sendFeedback } = require('../Controllers/UserController');
const {getOrderDetails,getUserCourse} =require("../Controllers/OrderController")
const { getAllCourse,getCourseById,buyCourse,razorpayCall,verify,search } = require('../Controllers/CourseController');
const {getCategory,getCourseByCategory}=require("../Controllers/CategoryController")
const {uploadImage}=require("../Middlewares/multer")


const router = express.Router();
const userAuth = require('../Middlewares/userAuth');
const cors = require('cors');

//POST method

//User login
router.post('/login', login);

//User signup
router.post('/signup', signup);

//Otp
router.post('/otp', otp);

//Forgot password
router.post('/forgotpassword', forgotPassword);

//Verify phone number with Otp
router.post('/forgototp', forgotOtp);

//Update password
router.post('/editPassword', editPassword);

//Resend Otp
router.post('/resendotp', resendOtp);

//Payment verify Otp
router.post('/verifyApi',userAuth,verify)

//Update password using current password
router.post('/profileChangePassword/:userId',profileChangePassword)

//Update user profile picture
router.post('/userProfileSubmit',userAuth,uploadImage('./public/Images/Profilephoto'),userProfileSubmit)

//Buy course 
router.post('/buyCourse/:courseId',userAuth,buyCourse)

//Payment gateway
router.post('/buyCourseFromCheckout/:courseId',userAuth,razorpayCall)

//User feedback 
router.post('/userFeedback/:courseId',userAuth,sendFeedback)

// GET method

//List all course 
router.get('/course', getAllCourse);

//Show user profile
router.get('/getUserProfile/:userId',getUserProfile);

//Home Page 
router.get('/',userAuth,userHeader)

//Show specific course
router.get('/getCourseById/:courseId',getCourseById)

//Show ordered details
router.get('/getOrderDetails/:courseId/:orderId', userAuth, getOrderDetails);

//Show ordered course
router.get('/getUserCourse',userAuth,getUserCourse)

//Search page
router.get('/search', search);

//Show Filter 
router.get('/getCategoryForFilter',getCategory)

//Show accourding to filters
router.get('/getCourseByCategory/:categoryName',getCourseByCategory)





module.exports = router;
