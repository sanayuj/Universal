const OrderModel = require("../Model/BookingModal");
const CourseModel = require("../Model/CourseModel");

module.exports.getOrderDetails = async (req, res, next) => {
  try {
    console.log("Entered into Controller!");
    const courseId = req.params.courseId;
    const orderId = req.params.orderId;
    const orderDetails = await OrderModel.findById(orderId);
    console.log(orderDetails, "!!!@@");
    const course = await CourseModel.findById(courseId);
    console.log(course, "+++++");
    res.json({
      message: "Order details fetched successfully",
      status: true,
      course,
      orderDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", status: false });
  }
};
module.exports.getUserCourse = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const courseDetails = await OrderModel.find({ user_id: userId }).populate(
      "course_id"
    );

    if (courseDetails && courseDetails.length > 0) {
      console.log(courseDetails, "$!!!");

      res.json({ message: "Course Found", status: true, courseDetails });
    } else {
      res.json({ message: "No Course Found", status: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

module.exports.getBookingHistroy = async (req, res, next) => {
  try {
    const BookingDetails = await OrderModel.find()
      .populate("course_id")
      .populate("user_id");
    console.log(BookingDetails, "getBooking@@@@@");
    res.json({
      message: "fetch booking history successfully",
      status: true,
      BookingDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

module.exports.getSingleBookingDetails = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    console.log(orderId, "****");
    const singleCourse = await OrderModel.findById({ _id: orderId })
      .populate("course_id")
      .populate("user_id");
    console.log(singleCourse, "^^^>>><<<");
    res.json({ message: "Fetch details", status: true, singleCourse });
  } catch (error) {
    //console.log(error)
    res.json({ message: "Internal server error", status: false });
  }
};
