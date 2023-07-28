import React, { useEffect, useState } from "react";
import "./WatchCoursePage.css";
import Header from "../Header/Header";
import * as Yup from "yup";

import { getCourseById } from "../../../Services/userApi";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";
import { useFormik } from "formik";
import { courseFeedback } from "../../../Services/userApi";
import {
  BsFillChatRightTextFill,
  BsFillExclamationCircleFill,
  BsFillCameraReelsFill,
} from "react-icons/bs";
import { FaUniversalAccess } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import YouTube from "react-youtube";

export default function WatchCoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [lessonDisplay, setLessonDisplay] = useState(false);
  const [feedback, setFeedback] = useState();
  const [videoUrl,setvideoUrl]=useState(null)
  const [stateVideoId,setStateVideoId]=useState(null)

  //fuction to convert youlink to get video id

  function getYouTubeVideoId(url) {
    if (!url) return null;
  
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }



  const initialValues = {
    feedback: "",
  };
  const validationSchema = Yup.object({
    feedback: Yup.string().required("* No feedback entered"),
  });
  const onSubmit = async (values) => {
    console.log(values, "!!!!Value");

    try {
      const { data } = await courseFeedback(courseId, values);
      formik.resetForm();
      console.log(data, "%%%");
      toast(data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        console.log(courseId, "!!!!");
        const response = await getCourseById(courseId);
        console.log(response.data.course, "!!@@!!");
        setCourse(response.data.course);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCourseById();
  }, [courseId]);

  function showLesson() {
    setLessonDisplay(!lessonDisplay);
  }



  function onViewLinkClick(url) {
    setvideoUrl(url);
    console.log(videoUrl,"*123#")
    const youtubeLink=videoUrl
    const youTubeVideoId=getYouTubeVideoId(youtubeLink);
    setStateVideoId(youTubeVideoId)
    console.log(stateVideoId,"final video Id---->")
  }


    // Replace 'YOUR_YOUTUBE_VIDEO_ID' with the actual video ID you want to display
   // const videoId = stateVideoId
  //console.log(videoId,"@@@@@")

    // Optional configuration options for the YouTube player
    const opts = {
      height: "400",
      width: "470",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };
    const onReady = (event) => {
      // Access to player in all event handlers via event.target
      event.target.pauseVideo();
    }

  return (
    <div>
      <Header />
      <div>
        <div className="MainDiv">
          <div className="CourseDetailsDiv">
            {course && (
              <div className="nameAndImage">
                <div>
                  <p className="path">{}</p>
                  <h1 className="courseName">{course.name}</h1>
                  <p className="courseAbout"> {course.about}</p>
                  <div className="dataLang">
                    <div className="iconDate">
                      <div>
                        <BsFillExclamationCircleFill />
                      </div>
                      <div className="date">
                        <p className="createdAt">
                          {" "}
                          Uploaded on :
                          {new Date(course.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </p>
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
              </div>
            )}
          </div>
          {course && (
            <div className="mainBuyCourseContent">
              <h3 className="headingOne">This course includes:</h3>
              <div className="courseInclude">
                <div className="leftBox">
                  <div>
                    <BsFillCameraReelsFill className="Icon" />
                    {`${course.duration}  hours on-demand video`}
                  </div>
                  <div>
                    <FaUniversalAccess className="Icon" /> Access on mobile and
                    TV
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
                  <div key={index} className="fullContentBox">
                    <div onClick={showLesson} className="contentBox">
                      <p className="chapters">{`${index + 1}. ${
                        values.chapter
                      }`}</p>
                    </div>
                    {lessonDisplay && (
                      <div>
                        {values.lessons.map((subValue, index) => {
                          return (
                            <div className="sumLession">
                              <div>
                                <p key={index} className="Lession">
                                  {subValue.lessonName}
                                  {console.log(subValue.videoUrl,"****=>")}
                                 
                                </p>
                              </div>
                              <div>
                              <Link
                                className="viewLink"
                                type="button"
                                onClick={() => onViewLinkClick(subValue.videoUrl)}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                data-bs-whatever="@getbootstrap"
                              >
                                View
                              </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
                <div className="Description">
                  <h3 className="headingThree">Description</h3>
                  <p>{course.description}</p>
                </div>
                <div className="feedback">
                  <h3 className="headingThree">Feedback</h3>
                  <form onSubmit={formik.handleSubmit}>
                    <div class="form-group">
                      <input
                        class="form-control formArea"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Write your feedback here..."
                        typeof="text"
                        name="feedback"
                        onChange={formik.handleChange}
                        value={formik.values.feedback}
                      />
                      {formik.touched.feedback && formik.errors.feedback ? (
                        <p
                          className="text-danger"
                          style={{ fontSize: "12px", margin: "0px" }}
                        >
                          {formik.errors.feedback}
                        </p>
                      ) : null}
                    </div>
                    <button className="feedbackSubmit" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </div>
      </div>



 {/* modal */}
 <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {course?.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            {stateVideoId && (
            <YouTube videoId={stateVideoId} opts={opts} onReady={onReady} />
            )}
              
            </div>

            <div className="modal-footer"></div>
            
          </div>
        </div>
      </div>
    </div>

  );
}
