const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  chapters: [
    {
      chapter: String,

      lessons: [
        {
            chapterName:String,
          lessonName: String,
          videoUrl: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Courses", courseSchema);
