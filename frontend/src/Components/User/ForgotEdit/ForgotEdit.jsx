import React from "react";
import "./ForgotEdit.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { uploadPassword } from "../../../Services/userApi";

import { toast } from "react-toastify";

import { setUserDetails } from "../../../features/setUser";

export default function Login() {
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("* This field is required")
      .min(6, "Password must be at least 6 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
        "Password must contain at least one capital letter\nand one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("* This field is required"),
  });
  const onSubmit = async (values) => {
    console.log(values, "new Password");
    try {
      const { data } = await uploadPassword(values);

      if (data.status) {
        toast(data.message);
        navigate("/login");
      } else {
        toast.error("Unexpected Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div class="main_div">
      <form class="form" onSubmit={formik.handleSubmit}>
        <div class="form-outline mb-4">
          <label class="form-label mb-4" for="form2Example1">
            Enter your new password
          </label>
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
            id="form2Example1"
            class="form-control"
            placeholder="New Password"
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
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <div class="row mb-1">
          <div class="col d-flex justify-content-center"></div>
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Update
        </button>
      </form>
    </div>
  );
}
