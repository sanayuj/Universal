const jwt = require("jsonwebtoken");

const userModel = require("../Model/userModel");

//User Authenticatio function using JWT

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const authToken = authHeader && authHeader.split(" ")[1];

    if (!authToken)
      return res.json({
        loginfail: true,
        status: false,
        message: "no auth token",
      });

    const decoded = jwt.verify(authToken, process.env.JWT_SECRETE_KEY);

    const user = await userModel.findOne({ _id: decoded.id });
    if (!user)
      return res.json({
        loginfail: true,
        status: false,
        message: "Unauthorized",
      });
    req.user = user;
    next();
  } catch (error) {
    return res.json({
      loginfail: true,
      status: false,
      message: "Unauthorized access",
    });
  }
};
