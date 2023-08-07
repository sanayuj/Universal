import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { userCourse } from "../../../Services/userApi";
import "./OrderPage.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function OrderPage() {
  const [courseDetails, setCourseDetails] = useState([]);
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    userCourse()
      .then((response) => {
        setLoading(false);
        const course = response.data.courseDetails;
        setCourseDetails(course);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/watchcourse/${courseId}`);
  };

  return (
    <div>
      <Header />
      {!Loading ? (
        <div className="MainContent">
          {courseDetails ? (
            courseDetails?.map((course) => (
              <div
                className="CourseDetails"
                onClick={() => handleCourseClick(course.course_id._id)}
                key={course._id}
              >
                <div className="subContent">
                  <div>
                    <img
                      className="OrderImage"
                      src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${course.course_id.image}`}
                      alt="Course Thumbnail"
                    />
                  </div>
                  <div className="MainOrderDetails">
                    <div className="OrderName">{course.course_id.name}</div>
                    <div className="myCourseAbout">
                      {course.course_id.about}
                    </div>
                    <div className="courseDuration">
                      <b>Duration:</b>
                      {course.course_id.duration}
                    </div>
                    <div className="myCourseCategory">
                      <b>Category:</b>
                      {course.course_id.category}
                    </div>
                    <div className="myCourseCreatedAt">
                      <b>Created At:</b>
                      {new Date(course.course_id.createAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className=" nullImage ">
              <img className="image" src="/Images/nullImage1.svg" alt="" />
              <p className="errorMsg">Course not found!</p>
            </div>
          )}
        </div>
      ) : (
        <div class="d-flex justify-content-center align-items-center vh-100">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
