import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { profileChangePassword,updateProfile } from "../../../Services/userApi";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [profileImage, setProfileImage] = useState();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {

    formik.setValues({
      username: user?.username,
      email: user?.email,
    });
  }, [user]);

  const initialValues = {
    username: "",
    email: "",
    image: null,
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProfileImage("image",file);
    formik.setFieldValue("image", file);
  };

  const onSubmit = async (values) => {
    try {
      console.log(profileImage, "ImagE");

      const {data}=await updateProfile(values,profileImage)
      if(data.status){
        toast.success(data.message)
      }else{
        toast.error(data.message)
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

    image: Yup.mixed().test(
      "fileType",
      "Unsupported file format",
      (value) =>
        value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
    ),
    email: Yup.string()
      .email("Invalid email address")
      .required("* This field is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      ),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const validationSchemaModal = Yup.object({
    oldPassword: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
        "Password must contain at least one capital letter\nand one special character"
      )
      .required("* This field is required"),

    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
        "Password must contain at least one capital letter\nand one special character"
      )
      .required("* This field is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("* This field is required"),
  });

  const formikModal = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaModal,
    onSubmit: async (values) => {
      try {
        const userId = user._id;
        const { data } = await profileChangePassword(values, userId);
        if (data.status) {
          toast(data.message);
        } else toast.error(data.message);
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
        });
      }
    },
  });

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Page title */}
            <div className="my-5">
              <h3>My Profile</h3>
              <hr />
            </div>
            {/* Form START */}
            <form onSubmit={formik.handleSubmit} className="file-upload" encType="">
              <div className="row mb-5 gx-5">
                {/* Contact detail */}
                <div className="col-xxl-8 mb-5 mb-xxl-0">
                  <div className="bg-secondary-soft px-4 py-5 rounded">
                    <div className="row g-3">
                      <h4 className="mb-4 mt-0">Contact detail</h4>
                      {/* First Name */}
                      <div className="col-md-6">
                        {formik.touched.username && formik.errors.username ? (
                          <p className="text-danger small">
                            {formik.errors.username}
                          </p>
                        ) : null}
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          aria-label="First name"
                          name="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                        />
                      </div>
                      {/* Last name */}
                      <div className="col-md-6"></div>
                      {/* Phone number */}
                      <div className="col-md-6">
                        {formik.touched.email && formik.errors.email ? (
                          <p className="text-danger small">
                            {formik.errors.email}
                          </p>
                        ) : null}
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          aria-label="Email"
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                      </div>
                      {/* Mobile number */}
                      <div className="col-md-6"></div>
                      {/* Email */}
                    </div>
                  </div>
                </div>

                {/* Upload profile */}
                <div className="col-xxl-4">
                  <div className="bg-secondary-soft px-4 py-5 rounded">
                    <div className="row g-3">
                      <h4 className="mb-4 mt-0">Upload your profile photo</h4>
                      <div className="text-center">
                        {/* Image upload */}
                        <div className="square position-relative display-2 mb-3  ">
                         
                         {!user?.image && <i className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>}
                          {profileImage ?
                          
                            <img
                              src={URL.createObjectURL(profileImage)}
                              alt="Profile Image"
                              className="img-fluid"
                            />:
                             <img
                               src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${user?.image}`}
                              alt="Profile Image"
                              className="img-fluid"
                            />
                          }
                        </div>

                        {/* Button */}
                        <input
                          type="file"
                          id="customFile"
                          name="image"
                          hidden=""
                          onChange={(e) => {
                            handleImage(e);
                            setProfileImage(e.target.files[0]);
                          }}
                        />
                        {formik.touched.image && formik.errors.image ? (
                          <p className="text-danger small">
                            {formik.errors.image}
                          </p>
                        ) : null}
                      </div>
                      <button type="button" className="btn btn-danger-soft">
                        Remove
                      </button>
                      {/* Content */}
                      <p className="text-muted mt-3 mb-0">
                        <span className="me-1">Note:</span>Minimum size 300px x
                        300px
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social media detail */}
              <div className="row mb-5 gx-5"></div>
              <div className="gap-3 d-md-flex justify-content-md-end text-center">
                <div>
                  <button
                    type="button"
                    className="updateBtn btn-primary btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@getbootstrap"
                  >
                    Change password
                  </button>
                </div>
                <button type="submit" className="updateBtn btn-primary btn-lg">
                  Update profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="col-xxl-12">
                <div className="px-4 ">
                  <div>
                    <h4 className="my-4">Change Password</h4>
                    <form onSubmit={formikModal.handleSubmit}>
                      <div className="col-md-12">
                        {formikModal.touched.oldPassword &&
                        formikModal.errors.oldPassword ? (
                          <p className="text-danger small m-0 p-0">
                            {formikModal.errors.oldPassword}
                          </p>
                        ) : null}
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          name="oldPassword"
                          onChange={formikModal.handleChange}
                          onBlur={formikModal.handleBlur}
                          value={formikModal.values.oldPassword}
                        />
                      </div>

                      <div className="col-md-12  mt-4">
                        {formikModal.touched.newPassword &&
                        formikModal.errors.newPassword ? (
                          <p className="text-danger small m-0 p-0">
                            {formikModal.errors.newPassword}
                          </p>
                        ) : null}
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword2"
                          name="newPassword"
                          placeholder="New password"
                          onChange={formikModal.handleChange}
                          onBlur={formikModal.handleBlur}
                          value={formikModal.values.newPassword}
                        />
                      </div>

                      <div className="col-md-12 mt-4">
                        {formikModal.touched.confirmPassword &&
                        formikModal.errors.confirmPassword ? (
                          <p className="text-danger small m-0 p-0">
                            {formikModal.errors.confirmPassword}
                          </p>
                        ) : null}
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword3"
                          name="confirmPassword"
                          placeholder="Confirm password"
                          onChange={formikModal.handleChange}
                          onBlur={formikModal.handleBlur}
                          value={formikModal.values.confirmPassword}
                        />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>

                        <button type="submit" class="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
