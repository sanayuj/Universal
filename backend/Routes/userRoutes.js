const express = require('express');
const { signup, login, otp, forgotPassword, forgotOtp, editPassword, resendOtp,getUserProfile,userHeader,profileChangePassword,userProfileSubmit,sendFeedback } = require('../Controllers/UserController');
const {getOrderDetails,getUserCourse} =require("../Controllers/OrderController")
const { getAllCourse,getCourseById,buyCourse,razorpayCall,verify,search } = require('../Controllers/CourseController');
const {getCategory,getCourseByCategory}=require("../Controllers/CategoryController")
const router = express.Router();
const {uploadImage}=require("../Middlewares/multer")
const userAuth = require('../Middlewares/userAuth');
const cors = require('cors');

router.post('/login', login);
router.post('/signup', signup);
router.post('/otp', otp);
router.post('/forgotpassword', forgotPassword);
router.post('/forgototp', forgotOtp);
router.post('/editPassword', editPassword);
router.post('/resendotp', resendOtp);


router.get('/course', getAllCourse);
router.get('/getUserProfile/:userId',getUserProfile);
router.get('/',userAuth,userHeader)
router.get('/getCourseById/:courseId',getCourseById)
router.get('/getOrderDetails/:courseId/:orderId', userAuth, getOrderDetails);
router.get('/getUserCourse',userAuth,getUserCourse)
router.get('/search', search);
router.get('/getCategoryForFilter',getCategory)
router.get('/getCourseByCategory/:categoryName',getCourseByCategory)


router.post('/verifyApi',userAuth,verify)
router.post('/profileChangePassword/:userId',profileChangePassword)
router.post('/userProfileSubmit',userAuth,uploadImage('./public/Images/Profilephoto'),userProfileSubmit)
router.post('/buyCourse/:courseId',userAuth,buyCourse)
router.post('/buyCourseFromCheckout/:courseId',userAuth,razorpayCall)
router.post('/userFeedback/:courseId',userAuth,sendFeedback)


module.exports = router;
