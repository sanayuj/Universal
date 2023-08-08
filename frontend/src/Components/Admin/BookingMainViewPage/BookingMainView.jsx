import React, { useEffect, useState } from "react";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import Sidebar from "../SideBar/SideBar";
import "./BookingMainView.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { singleCourseBookingDetails } from "../../../Services/adminApi";
import {
  BsFillChatRightTextFill,
  BsFillExclamationCircleFill,
  BsFillCameraReelsFill,
} from "react-icons/bs";

export default function BookingMainView() {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(id, "!!");
    singleCourseBookingDetails(id)
      .then((response) => {
        setLoading(false);
        setCourseDetails(response.data.singleCourse);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [id]);
  if (!Loading) {
    return (
      <div>
        <AdminNavBar />
        <Sidebar />

        <div className="bookingMainPage">Booking Details</div>
        <div className="bookingMainPageContent">
          {courseDetails && (
            <div>
              <div className="firstDivContent">
                <div className="leftSide">
                  <div>
                    <img
                      className="imageInMain"
                      src={`${process.env.REACT_APP_BASE_URL}/${courseDetails?.course_id.image}`}
                      alt="Course"
                    />
                  </div>
                </div>
                <div className="rightSide">
                  <p className="courseNameOne">
                    <b>{courseDetails?.course_id.name}</b>
                  </p>
                  <p className="courseAboutOne">
                    <b>{courseDetails?.course_id.about}</b>
                  </p>
                  <div className="courseDurationOne">
                    <div className="icon-container">
                      <BsFillCameraReelsFill />
                    </div>
                    <p>
                      Duration: {`${courseDetails?.course_id.duration} Hours`}
                    </p>
                    <div className="icon-container">
                      <BsFillExclamationCircleFill />
                    </div>

                    <p>
                      Created At:
                      {new Date(
                        courseDetails?.course_id.createAt
                      ).toLocaleDateString()}
                    </p>
                    <div className="icon-container">
                      <BsFillChatRightTextFill />
                    </div>
                    <p>Language: {`${courseDetails?.course_id.language}`}</p>
                  </div>
                </div>
              </div>
              <div className="container OrderDetails">
                <div className="purchase">
                  <h5>Purchase Details:</h5>
                  <p>
                    Purchased On :
                    {new Date(courseDetails?.booked_At).toLocaleDateString()}
                  </p>
                  <p>Payment ID :{` ${courseDetails?.payment_id} `}</p>
                  {courseDetails?.booking_details.map((value) => (
                    <div>
                      <p>Delivery type :{` ${value?.payment_method}`}</p>
                      <p>State :{` ${value?.state}`}</p>
                      <p>Country :{` ${value?.country}`}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h5>User Details:</h5>
                  <p>Username :{` ${courseDetails?.user_id.username} `}</p>
                  <p>Email :{` ${courseDetails?.user_id.email} `}</p>
                  <p>
                    Phone number :{` ${courseDetails?.user_id.phonenumber} `}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
