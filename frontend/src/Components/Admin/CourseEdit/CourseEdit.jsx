import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { getCourseById, editCourse } from "../../../Services/adminApi";
import "./CourseEdit.css";
import { useFormik } from "formik";
import Sidebar from "../SideBar/SideBar";
import { toast } from "react-toastify";
import AdminNavBar from "../AdminNavBar/AdminNavBar";

export default function CourseEdit() {
  const [Course, setCourse] = useState();
  const { courseId } = useParams();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourse = async (courseId) => {
      try {
        const response = await getCourseById(courseId);
        const courseData = response.data.course;
        formik.setValues({
          name: courseData.name,
          duration: courseData.duration,
          image: courseData.image,
          category: courseData.category,
          language: courseData.language,
          about: courseData.about,
          price: courseData.price,
          description: courseData.description,
        });
        setImageUrl(courseData.image);
        setCourse(courseData);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch course", error);
      }
    };

    fetchCourse(courseId);
  }, [courseId]);

  const validate = Yup.object({
    name: Yup.string().required("*Course Name Required"),
    duration: Yup.string().required("*Duration Required"),
    image: Yup.mixed()
      .required("*Image Required")
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
      ),
    category: Yup.string().required("*Category Required"),
    language: Yup.string().required("*Language Required"),
    about: Yup.string().required("*About Required"),
    price: Yup.string().required("*Price Required"),
    description: Yup.string().required("*Description Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      duration: "",
      image: "",
      category: "",
      language: "",
      about: "",
      price: "",
      description: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      setImage(values.image);
      const { data } = await editCourse(values, image, courseId);
      if (data.status) {
        toast(data.message, { position: "top-right" });
      } else {
        toast.error(data.message, { position: "top-right" });
      }
    },
  });
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    formik.setFieldValue("image", file);
  };
  const handleChange = (e) => {
    formik.setValues((prev) => {
      const formFields = { ...prev };
      formFields[e.target.name] = e.target.value;
      return formFields;
    });
  };

  return (
    <div>
      <Sidebar />
      <AdminNavBar />
      <div className="Main_content">
        <div>
          <div>
            <h5 className="Heading">Edit Course</h5>
            <div className="FormMainDev">
              {!Loading ? (
                <form onSubmit={formik.handleSubmit}>
                  <div className="Common">
                    <div>
                      <label for="formFileDisabled" class="form-label">
                        Upload Image for thumbnail
                      </label>
                      <input
                        class="form-control "
                        // ImageUpload
                        type="file"
                        name="image"
                        onBlur={formik.handleBlur}
                        id="formFileDisabled"
                        onChange={(e) => {
                          handleImage(e);
                          setImage(e.target.files[0]);
                        }}
                      />

                      {formik.touched.image && formik.errors.image ? (
                        <p className="text-danger small">
                          {formik.errors.image}
                        </p>
                      ) : null}
                    </div>
                    <div class="form-group spaceBetween">
                      <label
                        for="exampleFormControlInput1"
                        className="bottomSpace"
                      >
                        Price
                      </label>

                      <input
                        type="Number"
                        name="price"
                        value={formik.values.price}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-control "
                        id="exampleFormControlInput1"
                        placeholder=""
                      />

                      {formik.touched.price && formik.errors.price ? (
                        <p className="text-danger small">
                          {formik.errors.price}
                        </p>
                      ) : null}
                    </div>
                    <div class="form-group ">
                      <label
                        for="exampleFormControlInput1"
                        className="bottomSpace"
                      >
                        Duration
                      </label>
                      <input
                        type="Number"
                        name="duration"
                        value={formik.values.duration}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-control "
                        id="exampleFormControlInput1"
                        placeholder=""
                      />

                      {formik.touched.duration && formik.errors.duration ? (
                        <p className="text-danger small">
                          {formik.errors.duration}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="Common">
                    <div class="form-group category  spaceBetween">
                      <label
                        for="exampleFormControlInput1"
                        className="bottomSpace"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={formik.values.category}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-control "
                        id="exampleFormControlInput1"
                        placeholder=""
                      />

                      {formik.touched.category && formik.errors.category ? (
                        <p className="text-danger small">
                          {formik.errors.category}
                        </p>
                      ) : null}
                    </div>
                    <div class="form-group   category">
                      <label
                        for="exampleFormControlInput1"
                        className="bottomSpace"
                      >
                        Languages
                      </label>
                      <input
                        type="text"
                        name="language"
                        value={formik.values.language}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        className="form-control "
                        id="exampleFormControlInput1"
                        placeholder=""
                      />

                      {formik.touched.language && formik.errors.language ? (
                        <p className="text-danger small">
                          {formik.errors.language}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="">
                    <div class="form-group top-space ">
                      <label
                        for="exampleFormControlInput1"
                        className="bottomSpace"
                      >
                        Course Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        onBlur={formik.handleBlur}
                        placeholder=""
                        name="name"
                        value={formik.values.name}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />

                      {formik.touched.name && formik.errors.name ? (
                        <p className="text-danger small">
                          {formik.errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div class="form-group top-space">
                      <label
                        for="exampleFormControlInput1"
                        className="bottomSpace"
                      >
                        About
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="about"
                        value={formik.values.about}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder=""
                      />

                      {formik.touched.about && formik.errors.about ? (
                        <p className="text-danger small">
                          {formik.errors.about}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div class="form-group top-space">
                    <label
                      for="exampleFormControlTextarea1"
                      className="bottomSpace"
                    >
                      Description
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="description"
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                      <p className="text-danger small">
                        {formik.errors.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="button">
                    <div>
                      {/* <button
                      type="button"
                      className="addChapter"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@getbootstrap"
                    >
                      Edit Chapter
                    </button> */}
                    </div>
                    <button type="submit" className="submitbtn">
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <div class="d-flex justify-content-center align-items-center vh-100">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              )}
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
                  Add Chapter
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Chapter Name :
                    </label>
                    <input
                      type="text"
                      name="chapterName"
                      // value={chapter}
                      // onBlur={formik.handleBlur}
                      // onChange={(e) => {
                      //   handleLessonChange(e);
                      //   setChapter(e.target.value);
                      // }}
                      class="form-control"
                      id="recipient-name"
                    />

                    <p className="text-red-500 text-xs ">error</p>
                  </div>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Lesson Name :
                    </label>
                    <input
                      type="text"
                      name="lessonName"
                      value=""
                      onChange={(e) => {}}
                      class="form-control"
                      id="recipient-name"
                    />

                    <p className="text-red-500 text-xs ">error</p>
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">
                      Video Link :
                    </label>
                    <input
                      type="text"
                      value=""
                      onBlur=""
                      name="videoUrl"
                      class="form-control"
                      onChange={(e) => {}}
                      id="recipient-name"
                    />

                    <p className="text-red-500 text-xs ">error</p>
                  </div>
                </form>
                {/* {lesson[0] ? (
              <div>
                  {lesson.map((value, index) => {
                    return   <div className="showLesson"><p> {value.lessonName}</p></div>
                  })}
                </div>
              ) : (
                <div className=""></div>
              )} */}

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn addMore"
                    //  onClick={lessonFormik.handleSubmit}
                  >
                    Add
                  </button>

                  <button
                    // onClick={courseSubmit}
                    type="button"
                    class="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
