require("dotenv").config();
const dbConnection = require("./Config/dbconnection");
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require('morgan');
const app = express();
const session=require('express-session')
const userRoutes = require("./Routes/userRoutes");
const AdminRoutes = require("./Routes/AdminRoutes");
const maxAge = 3 * 24 * 60 * 60;

//database
dbConnection.dbConnect();

app.use(cors({
  origin:process.env.ORIGIN,
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(logger("dev"))


//session
app.use(
  session({
    secret: "add-secret-key",
    resave: false,
    saveUninitialized: true,
    
  })
);

//middleware to parse data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRoutes);
app.use("/admin", AdminRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Sever started at port ${process.env.PORT}`);
});





module.exports = app;
