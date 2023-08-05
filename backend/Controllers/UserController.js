const user = require("../Model/userModel");
const review = require("../Model/ReviewModel");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const bcrypt = require("bcrypt");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const serviceID = process.env.SERVICE_SID;
const client = require("twilio")(accountSid, authToken);
const session = require("express-session");
const { json, response } = require("express");
const userModel = require("../Model/userModel");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxAge,
  });
};
const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message === "Incorrect Email") {
    errors.email = "Email is not registerd";
  }
  if (err.message === "Incorrect password") {
    errors.password = "Incorrect Password";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.signup = async (req, res, next) => {
  const { username, email, password, phonenumber, confirmPassword } = req.body;

  try {
    const existTrue = await user.findOne({ phonenumber: phonenumber });
    if (existTrue) {
      res.json({ message: "This number is already exist", status: false });
    } else {
      const emailExist = await user.findOne({ email: email });
      if (emailExist) {
        res.json({ message: "This email is already exist", status: false });
      } else {
        req.session.newUser = req.body;
        client.verify.v2
          .services(serviceID)
          .verifications.create({ to: `+91${phonenumber}`, channel: "sms" });
        res.json({ status: true });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.otp = async (req, res, next) => {
  try {
    const otpCode = req.body.otp;
    client.verify.v2
      .services(serviceID)
      .verificationChecks.create({
        to: `+91${req.session.newUser.phonenumber}`,
        code: otpCode,
      })
      .then(async (verification_check) => {
        if (verification_check.status === "pending") {
          res.json({ status: false, message: "Entered OTP is invailed" });
        }
        if (verification_check.status === "approved") {
          const newMember = new user({
            username: req.session.newUser.username,
            email: req.session.newUser.email,
            phonenumber: req.session.newUser.phonenumber,
            password: req.session.newUser.password,
            verfied: true,
          });
          const userDetails = await newMember.save();
          const token = createToken(user._id);
          res.json({
            message: "Your verification completed successfully",
            status: true,
            token,
          });
        }

        if (verification_check.status === 429) {
          res.json({ status: false, message: " Max check attempts reached" });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await user.findOne({ email });
    if (customer) {
      const auth = await bcrypt.compare(password, customer.password);
      if (auth) {
        const token = createToken(customer._id);
        res.status(200).json({ user: customer, created: true, token });
      } else {
        throw Error("Incorrect password");
      }
    } else {
      throw Error("Incorrect Email");
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

module.exports.forgotPassword = async (req, res, next) => {
  try {
    const { phonenumber } = req.body;
    req.session.phonenumber = phonenumber;
    console.log(req.session.phonenumber, "SESSION GOT in first function!!");
    const customer = await user.findOne({ phonenumber });
    if (customer) {
      client.verify.v2
        .services(serviceID)
        .verifications.create({ to: `+91${phonenumber}`, channel: "sms" });
      res.json({ message: "User found successfully", status: true });
    } else {
      res.json({ message: "User not found. Enter your OTP", status: false });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
module.exports.forgotOtp = async (req, res, next) => {
  try {
    const phonenumber = req.session.phonenumber;
    const otp = req.body.otp;
    console.log(otp);

    const verification_check = await client.verify.v2
      .services(serviceID)
      .verificationChecks.create({
        to: `+91${phonenumber}`,
        code: otp,
      });
    if (verification_check.status === "approved") {
      res.json({ status: true, message: "authication success." });
    } else {
      res.json({ status: false, message: "Invaild OTP,try again." });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.editPassword = async (req, res, next) => {
  try {
    const newPassword = req.body.password;
    const phoneNumber = req.session.phonenumber;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const customer = await user.findOne({ phonenumber: phoneNumber });
    await user.updateOne(
      { phonenumber: phoneNumber },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    res.json({
      status: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.resendOtp = async (req, res, next) => {
  try {
    const phonenumber = req.session.phonenumber;
    const customer = await user.findOne({ phonenumber });

    if (customer) {
      client.verify.v2
        .services(serviceID)
        .verifications.create({ to: `+91${phonenumber}`, channel: "sms" });
      res.json({ message: "OTP resent successfully", status: true });
    } else {
      res.json({ message: "User not found", status: false });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.userHeader = async (req, res, next) => {
  try {
    const userdetails = req.user;
    res.json({ status: true, user: userdetails });
  } catch (error) {
    res.json({ status: false });
  }
};

module.exports.profileChangePassword = async (req, res, next) => {
  try {
    const oldPassword = req.body.values.oldPassword;
    const newPassword = req.body.values.newPassword;
    const userId = req.params.userId;

    const User = await user.findById(userId);

    if (!User) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    const isMatch = await bcrypt.compare(oldPassword, User.password);
    console.log(isMatch, "MATCH!!!");

    if (!isMatch) {
      return res.json({ message: "Invalid old password", status: false });
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    user.password = newPasswordHash;
    await User.save();

    res.json({ message: "Password updated successfully", status: true });
  } catch (error) {
    console.log(error, "ERR");
    res.json({ message: "Internal server error", status: false });
  }
};

module.exports.userProfileSubmit = async (req, res, next) => {
  try {

    let profileImage = req.files.image[0].path.replace("public/", "");
    userModel.updateOne({$set:{
      username:req.body.username,
      email:req.body.email,
      image:profileImage,

    }}).then((response)=>{
      res.json({message:"Profile updated successfully",status:true})
    })
  } catch (error) {
    res.json({ message: "Internal server error", status: false });
  }
};

module.exports.sendFeedback = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    const userFeedback = req.body.values.feedback;
    const existingFeedback = await review.findOne({
      user: userId,
      course: courseId,
    });

    if (existingFeedback) {
      return res.json({
        message: "Feedback already exists for this course",
        status: false ,exist:true
      });
    }

    const newFeedback = new review({
      review: userFeedback,
      user: userId,
      course: courseId,
    });

    const savedFeedback = await newFeedback.save();

    res.json({ message: "Thank you for your valuable feedback", status: true });
  } catch (error) {
    res.json({ message: "Internal server error", status: false });
  }
};
