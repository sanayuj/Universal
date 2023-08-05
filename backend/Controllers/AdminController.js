const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require("../Model/adminModel");
const courseModel = require("../Model/CourseModel");
const userModel = require("../Model/userModel");
const BookingModel = require("../Model/BookingModal");
const CategoryModel = require("../Model/CategoryModel");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.Adminlogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email });

    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);

      if (auth) {
        const token = await createToken(admin._id);

        res.json({ status: true, message: "Admin login successfully", token });
      } else {
        res.json({ status: false, message: "Incorrect password" });
      }
    } else {
      res.json({
        status: false,
        message: "Admin not found, please check your email",
      });
    }
  } catch (error) {
    res.json({ status: false, message: "error.message" });
  }
};

module.exports.adminDashboard=async(req,res,next)=>{
  try{
    const userCount=await userModel.countDocuments({})
    const courseCount=await courseModel.countDocuments({})
    const bookingCount=await BookingModel.countDocuments({})
    const categoryCount=await CategoryModel.countDocuments({})
    res.json({message:"details found successfully ",status:true,userCount,courseCount,bookingCount,categoryCount})
  }catch(error){
    res.json({message:"Internal server error",status:false})
  }
}