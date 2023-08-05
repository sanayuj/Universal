import React, { useState } from "react";
import * as Yup from "yup";
import "./Signup.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { userSignup } from "../../../Services/userApi";

export default function Signup() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    confirmPassword: "",
  };
  const onSubmit = async (values) => {
    try {

console.log("onSubmit called!!")
      const { data } = await userSignup(values);
      if (data.status) {
        navigate("/otp");
      } else {
        toast.error(data.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .strict(true)
      .trim("Name must not contain white space")
      .test(
        "no-whitespace",
        "Name must not contain white space",
        (value) => !/\s/.test(value)
      )
      .min(3, "Name must be at least 3 characters long")
      .matches(/^[A-Za-z]+$/, "Name must only contain characters")
    .required("* This field is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("* This field is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      ),
    phonenumber: Yup.string().matches(/^\d{10}$/, "Invalid phone number")
    .required("* This field is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
        "Password must contain at least one capital letter\nand one special character"
      ).required("* This field is required"),

    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    )
    .required("* This field is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div class="main_div">
    
      <form onSubmit={formik.handleSubmit} class="form">
        <div class="form-outline mb-4">
          <label class="form-label mb-4" for="form2Example1">
            Sign up and start learning
          </label>

          {formik.touched.username && formik.errors.username ? (
            <p
              className="text-danger"
              style={{ fontSize: "12px", margin: "0px" }}
            >
              {formik.errors.username}
            </p>
          ) : null}
          <input
            type="text"
            id="formuserName1"
            className="form-control"
            placeholder="Username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        </div>

        <div class="form-outline mb-4">
          {formik.touched.email && formik.errors.email ? (
            <p
              className="text-danger"
              style={{ fontSize: "12px", margin: "0px" }}
            >
              {formik.errors.email}
            </p>
          ) : null}
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {/* phone number */}
        <div class="form-outline mb-4">
          {formik.touched.phonenumber && formik.errors.phonenumber ? (
            <p
              className="text-danger"
              style={{ fontSize: "12px", margin: "0px" }}
            >
              {formik.errors.phonenumber}
            </p>
          ) : null}
          <input
            type="tel"
            id="form2Example2"
            className="form-control"
            placeholder="Phone Number"
            name="phonenumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phonenumber}
          />
        </div>

        <div class="form-outline mb-4">
          {formik.touched.password && formik.errors.password ? (
            <p
              className="text-danger"
              style={{ fontSize: "12px", margin: "0px" }}
            >
              {formik.errors.password}
            </p>
          ) : null}
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        <div class="form-outline mb-4">
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p
              className="text-danger"
              style={{ fontSize: "12px", margin: "0px" }}
            >
              {formik.errors.confirmPassword}
            </p>
          ) : null}
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
        </div>

        <div class="row mb-1">
          <div class="col d-flex justify-content-center"></div>
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <hr></hr>
        <div class="signup_link">
          Already have an account?<Link to="/Login">Login</Link>
        </div>
      </form>
    </div>
  );
}


