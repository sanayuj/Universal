const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  booked_At: {
    type: String,
    required: true,
  },
  booking_details: [
    {
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      payment_method: {
        type: String,
      },

     
    },
  ],
  payment_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const BookingModel = mongoose.model("booking", bookingSchema);
module.exports = BookingModel;
