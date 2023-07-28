const courseModel = require("../Model/CourseModel");
const bookingModel = require("../Model/BookingModal");
const { uploadImage } = require("../Middlewares/multer");
const { response } = require("express");
const Razorpay = require("razorpay");
const { error } = require("console");
const crypto = require("crypto");

module.exports.addCourse = async (req, res, next) => {
  try {
    let courseImage = req.files.image[0].path.replace("public/", "");

    console.log(req.body);

    const newCourse = new courseModel({
      name: req.body.name,
      about: req.body.about,
      description: req.body.description,
      category: req.body.category,
      duration: req.body.duration,
      language: req.body.language,
      price: req.body.price,
      image: courseImage,
      chapters: req.body.course,
    });

    await newCourse
      .save()
      .then(() => {
        res.json({ message: "Course added successfully", status: true });
      })
      .catch((error) => {
        console.log(error);
        res.json({ message: "Course added Failed", status: false });
      });
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", status: false });
  }
};

module.exports.getAllCourse = async (req, res, next) => {
  try {
    let course = await courseModel.find({});
    if (course) {
      console.log(course);
      res.json({ course, status: true, message: "course found" });
    } else {
      res.json({ message: "No course found" });
    }
  } catch (error) {
    res.json({ message: "Internal server Error", error });
  }
};

module.exports.deleteCourse = async (req, res, next) => {
  try {
    console.log(req.params.courseId, "Course Id!!!");
    courseModel
      .findOneAndDelete({ _id: req.params.courseId })
      .then((response) => {
        res.json({
          message: "Course deleted successfully",
          status: true,
          id: req.params.courseId,
        });
      })
      .catch((error) => {
        res.json({
          message: "Faced some Issue while deleting Course",
          status: false,
        });
      });
  } catch (error) {
    res.json({ message: "Internal server error", status: false });
  }
};

module.exports.getCourseById = async (req, res, next) => {
  console.log(req.params.courseId, "%%%%%!!!!");
  try {
    const course = await courseModel.findById({ _id: req.params.courseId });
    console.log(course, "#####!!!!#####");
    if (course) {
      res.json({ message: "Course got successfully", status: true, course });
    } else {
      res.json({
        message: "Faced some issue while geting course",
        status: false,
      });
    }
  } catch (error) {
    console.log(error, "!!");

    res.json({ message: "Internal server error", status: false });
  }
};

module.exports.editCourse = async (req, res, next) => {
  try {
    const id = req.params.courseId;
    let courseImage = req.files.image[0].path.replace("public/", "");
    console.log("opp", req.body, "Controller in editCourse!!!");

    let course = await courseModel.findOne({ _id: id });
    if (course) {
      console.log("Enterd into course!");
      courseModel
        .updateOne(
          { _id: id },
          {
            $set: {
              name: req.body.name,
              about: req.body.about,
              description: req.body.description,
              category: req.body.category,
              duration: req.body.duration,
              language: req.body.language,
              price: req.body.price,
              image: courseImage,
            },
          }
        )
        .then((response) => {
          res.json({ message: "Course edited successfully", status: true });
        });
    }
  } catch (error) {
    res.json({ message: "Internal server Error", status: false });
  }
};

module.exports.buyCourse = async (req, res, next) => {
  try {
    const CourseId = req.params.courseId;
    const userdetails = req.user;

    const existingOrder = await bookingModel.findOne({
      user_id: userdetails._id,
      course_id: CourseId,
    });

    if (existingOrder) {
      return res.json({
        message: "Course already exists ",
        login: true,
        exist: true,
      });
    } else {
      res.json({
        message: "Enter details and choose payment method",
        status: true,
        login: true,
        CourseId,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error, status: false });
  }
};

module.exports.razorpayCall = async (req, res, next) => {
  try {
    const CourseId = req.params.courseId;
    console.log(CourseId, "---->!");
    let course = await courseModel.findById(CourseId);
    const price = course.price;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: price * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        return res.status(500).json({ message: "Something went wrong" });
      }
      res.status(200).json({ status: true, order });
    });
  } catch (error) {
    res.json({ message: "Internal server error", status: false });
  }
};

module.exports.verify = async (req, res, next) => {
  const courseId = req.body.courseId;
  const amount = req.body.amount / 100;

  console.log(courseId, "IIIIIIdddddd--->");

  const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const newOrder = new bookingModel({
        user_id: req.user._id,
        course_id: courseId,
        booked_At: date,
        booking_details: [
          {
            state: req.body.bookingData.state,
            country: req.body.bookingData.country,
            payment_method: req.body.bookingData.paymentMethod,
          },
        ],
        payment_id: req.body.razorpay_payment_id,
        amount: req.body.amount / 100,
      });

      const order = await newOrder.save();
      const orderId = order._id;

      return res.status(200).json({
        message: "Verified successfully",
        status: true,
        courseId,
        orderId,
      });
    } else {
      return res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error!", status: false });
  }
};

module.exports.search = async (req, res, next) => {
  try {
    key = req.query.q.replace(/[^a-zA-Z ]/g, "");
    const skip = (req.query.correctPage - 1) * req.query.limit;
    const limit = parseInt(req.query.limit);
    const totalCount = await courseModel
      .find({
        $or: [
          { name: { $regex: key, $options: "i" } },
          { category: { $regex: key, $options: "i" } },
        ],
      })
      .countDocuments({});
    const totalPages = Math.ceil(totalCount / limit);
    const Data = await courseModel
      .find({
        $or: [
          { name: { $regex: key, $options: "i" } },
          { category: { $regex: key, $options: "i" } },
        ],
      })
      .skip(skip)
      .limit(limit);
    if (!Data || Data.length === 0) {
      res.json({ status: false, message: "No Course found" });
    } else {
      res.json({
        message: "fetch course successfully",
        status: true,
        Data,
        totalCount,
        totalPages,
      });
    }
  } catch (error) {
    res.json({ message: "Internal server error", status: false });
  }
};
