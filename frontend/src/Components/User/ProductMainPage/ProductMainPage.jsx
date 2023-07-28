import React, { useEffect, useState } from "react";
import "./ProductMainPage.css";
import Header from "../Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, getAllCourse } from "../../../Services/userApi";
import {
  BsFillChatRightTextFill,
  BsFillExclamationCircleFill,
  BsFillCameraReelsFill,
} from "react-icons/bs";

import { FaUniversalAccess } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import Footer from "../Footer/Footer";
import {buySingleCourse} from "../../../Services/userApi"
import { toast } from "react-toastify";

export default function ProductMainPage() {
  const navigate = useNavigate();
  const [subCourse, setsubCourse] = useState(null);
  const [course, setCourse] = useState(null);
  const [date, setDate] = useState();
  let formattedDate;
  const { courseId } = useParams();

  const handleCourseClick = (courseId) => {
    navigate(`/course/courseMainPage/${courseId}`);
  };

  const buyCourseClick= (courseId)=>{
console.log(courseId,"OOOOpppps")
 buySingleCourse(courseId).then((response)=>{
  console.log(response.data,"!!!!!")


 if(response.data.login && !response.data.exist){
 const courseId=response.data.CourseId
  
  navigate(`/checkout/${courseId}`)
  toast(response.data.message)
 }else if( response.data.exist){
  console.log(response.data,"&&&&&723")
  toast.error("Course already exists")
 }
 else{
  navigate('/login')
  toast.error(response.data.message)
 }
}).catch((error)=>{
toast(error)
})
  }

  useEffect(() => {
    getAllCourse()
      .then((response) => {
        setsubCourse(response.data.course.slice(0, 3));
      })
      .catch((error) => {
        console.error("Error fetching course", error);
      });
    getCourseById(courseId)
      .then((response) => {
        setCourse(response.data.course);
        const createdAt = response.data.course.createAt;

        formattedDate = new Date(createdAt).toLocaleString(undefined, {
          year: "numeric",
          month: "long",
        });
        setDate(formattedDate);
      })
      .catch((error) => {
        console.error("Error fetching course", error);
      });
  }, [courseId]);

  return (
    <div>
  { course? <div className="MainDiv">
      <Header />
      <div className="CourseDetailsDiv">
        {course && (
          <div className="nameAndImage">
            <div key={course.id}>
              <p className="path">{`${course.category} > ${course.name}`}</p>
              <h1 className="courseName">{course.name}</h1>
              <p className="courseAbout"> {course.about}</p>
              <div className="dataLang">
                <div className="iconDate">
                  <div>
                    <BsFillExclamationCircleFill />
                  </div>
                  <div className="date">
                    <p className="createdAt"> Uploaded on :{`${date}`}</p>
                  </div>
                </div>
                <div className="iconLang">
                  <div>
                    <BsFillChatRightTextFill />
                  </div>
                  <div className="lang">
                    <p className="courseLang">{course.language}</p>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="sideDiv">
              <div className="courseImage">
                <div>
                  {" "}
                  <img
                    className="courseImage"
                    src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${course.image}`}
                  />
                </div>
                <div className="sideDivDetails">
                  <p className="coursePrice">₹{course.price}</p>
                  <button className="buyBtn" onClick={()=>buyCourseClick(course._id)}>Buy this course</button>
                  <p className="label">Full Lifetime Access</p>
                  <hr></hr>
                  <p className="ads">
                    Get this course, plus 8,000+ of our top-rated courses.
                  </p>
                  <button className="ExploreBtn">Explore</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {course && (
        <div className="mainProductContent">
          <h3 className="headingOne">This course includes:</h3>
          <div className="courseInclude">
            <div className="leftBox">
              <div>
                <BsFillCameraReelsFill className="Icon" />
                {` ${course.duration} hours on-demand video`}
              </div>
              <div>
                <FaUniversalAccess className="Icon" /> Access on mobile and TV
              </div>
            </div>
            <div className="rightBox">
              <div>
                <AiFillSafetyCertificate className="Icon" />
                Certificate of completion
              </div>
            </div>
          </div>
          <div className="courseContent">
            <h3 className="headingTwo">Course Content</h3>
            {course.chapters.map((values, index) => (
              <div className="fullContentBox">
                <div className="contentBox">
                  <p className="chapters">{`${index + 1}. ${
                    values.chapter
                  }`}</p>
                </div>
              </div>
            ))}
            <div className="Description">
              <h3 className="headingThree">Description</h3>
              <p>{course.description}</p>
            </div>
            <div className="studentBought">
              <h3 className="headingTwo">Students also bought</h3>
              {subCourse &&
                subCourse.map((value) => (
                  <div
                    className="studentCourseDetails"
                    key={value._id}
                    onClick={() => handleCourseClick(value._id)}
                  >
                    <div className="Image">
                      <img
                        className="Image"
                        src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${value.image}`}
                      ></img>
                    </div>
                    <div className="detailsAndPrice">
                      <div>
                        <p>
                          <b>{value.name}</b>
                        </p>
                        <div className="timeAnddate">
                          <div className="courseTime">
                            <p>
                              <b>{`${value.duration} Total hours`}</b>
                            </p>
                          </div>
                          <div>
                            <p>{`Created on: ${date}`}</p>
                          </div>
                        </div>
                      </div>
                      <div className="CoursePrice">₹{value.price}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>:<div class="d-flex justify-content-center align-items-center vh-100">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>}
    </div>
  );
}
