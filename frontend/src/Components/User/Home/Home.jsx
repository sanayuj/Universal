import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourse } from "../../../Services/userApi";
import { useNavigate } from "react-router-dom";
import FilterCategory from "../FilterCategory/FilterCategory";
import Carousel from "../Carousel/Carousel";
import Footer from "../Footer/Footer";
export default function Home() {
  const navigate=useNavigate()
  const user = useSelector((state) => state.user.value);
  const [courseDetails, setCourseDetails] = useState([]);
  const dispatch = useDispatch();

  const handleCourseClick=(courseId)=>{
    console.log(courseId)
    navigate(`/course/courseMainPage/${courseId}`)
  }

  useEffect(() => {
    getAllCourse()
      .then((response) => {
       // console.log(response)
        setCourseDetails(response.data.course);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div >
      <Header />{" "}
      <FilterCategory/>
      <Carousel/>
<div className="container ">
      <div className="row mainContainer">
      <h3 className="allCourseDisplayHeading">Let start learning,{`${user?.username}`}</h3>
        {courseDetails && courseDetails
          ? courseDetails.map((value, index) => {
            //console.log(value,"^^^^^")
              return (
                <div className="courseDiv " key={value?._id} onClick={()=>handleCourseClick(value._id)}>
                  <div>
                    {" "}
                    <img
                      className="coursePhoto"
                      src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${value.image}`}
                    />
                  </div>
                  <div className="text">
                    <p className="CourseHeading">
                      <b>{value?.name}</b>
                    </p>
                    <p className="CourseAbout">{value?.about}</p>
                    <p className="CoursePrice">
                      ₹{`${value.price} `}
                      <br />
                     <p className="time">{` ${value?.duration}`} total hours</p> 
                    </p>
                  </div>
                </div>
              );
            })
          : <div class="d-flex justify-content-center align-items-center vh-100">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>}
      </div>
      </div>
      <Footer/>
    </div>
  );
}
