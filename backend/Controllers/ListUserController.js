const userModel = require("../Model/userModel");

//Show all Users in admin side

module.exports.getAllUser = async (req, res, next) => {
  try {
    let User = await userModel.find({});
    if (User) {
      res.json({ User, status: true, message: "All active users" });
    } else {
      res.json({ message: "No user Found", status: false });
    }
  } catch (error) {
    res.json({ message: "Internal server error", status: false, error });
  }
};
