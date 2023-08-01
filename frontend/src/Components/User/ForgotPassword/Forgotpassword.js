import React, { useState } from "react";
import "./Forgotpassword.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Forgotpassword } from "../../../Services/userApi";
import { toast } from "react-toastify";
import PhoneContext from "../ForgotOtp/ForgotOtp";

export default function ForgotPassword() {
  const Navigate = useNavigate();

  const initialValues = {
    phonenumber: "",
  };

  const validationSchema = Yup.object({
    phonenumber: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("* This field is required"),
  });

  const onSubmit = async (values) => {

    try {
      const { data } = await Forgotpassword(values);
      if (data) {
        if (data.status) {
          toast.success(data.message, {
            position: "top-right",
          });
          Navigate("/forgotOtp");
        } else {
          toast.error(data.message, {
            position: "top-right",
          });
        }
      }
    } catch (error) {
      //  toast.error(error,{
      //   position:"top-right"
      //  })
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
            Enter your registered phone number
          </label>
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
            id="form2Example1"
            class="form-control"
            placeholder="Phone Number"
            name="phonenumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phonenumber}
          />
        </div>

        <div class="row mb-1">
          <div class="col d-flex justify-content-center"></div>
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Send OTP
        </button>

        <hr></hr>
      </form>
    </div>
  );
}
