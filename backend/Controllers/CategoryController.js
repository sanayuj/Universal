const categoryModel = require("../Model/CategoryModel");
const { uploadImage } = require("../Middlewares/multer");
const CourseModel = require("../Model/CourseModel");

//Add Category Function

module.exports.addCategory = async (req, res, next) => {
  try {
    let categoryImage = req.files.image[0].path.replace("public/", "");

    const newCategory = new categoryModel({
      categoryName: req.body.category,
      imageUrl: categoryImage,
    });

    await newCategory
      .save()
      .then(() => {
        res.json({ message: "Category added successfully", status: true });
      })
      .catch((error) => {
        res.json({ message: "Category added Failed", status: false });
      });
  } catch (error) {
    res.json({ message: "Internal server error 404!" });
  }
};

//show Category Function

module.exports.getCategory = async (req, res, next) => {
  try {
    const categories = await categoryModel.find({});
    if (categories) {
      res.json({ message: "fetch categories successfully", categories });
    } else {
      res.json({
        message: "Faced some issue in fetching categories",
        status: false,
      });
    }
  } catch (error) {
    res.json({ message: "Internal server error", status: false });
  }
};

// show course filter accourding category

module.exports.getCourseByCategory = async (req, res, next) => {
  try {
    const skip = (req.query.currectPage - 1) * req.query.limit;
    const limit = parseInt(req.query.limit);
    const totalCount = await CourseModel.find({
      category: req.params.categoryName,
    }).countDocuments({});

    const totalPages = Math.ceil(totalCount / limit);
    const categoryCourse = await CourseModel.find({
      category: req.params.categoryName,
    })
      .skip(skip)
      .limit(limit);

    if (!categoryCourse || categoryCourse.length === 0) {
      res.json({ status: false, message: "No Course found" });
    } else {
      res.json({
        message: "fetch course by category",
        status: true,
        categoryCourse,
        totalCount,
        totalPages,
      });
    }
  } catch (error) {
    res.json({ message: "Internal server error", staus: false });
  }
};
