import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { userCourse } from '../../../Services/userApi';
import './OrderPage.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function OrderPage() {
  const [courseDetails, setCourseDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    userCourse()
      .then((response) => {
        console.log(response.data, '--->');
        const course = response.data.courseDetails;
        console.log(course, '@@@@@@');
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
      <div className='MainContent'>
        {courseDetails?.map((course) => (
          <div
            className='CourseDetails'
            onClick={() => handleCourseClick(course.course_id._id)}
            key={course._id}
          >
            <div className='subContent'>
              <div>
                <img
                  className='OrderImage'
                  src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${course.course_id.image}`}
                  alt='Course Thumbnail'
                />
              </div>
              <div className='MainOrderDetails'>
                <div className='OrderName'>{course.course_id.name}</div>
                <div className='myCourseAbout'>{course.course_id.about}</div>
                <div className='courseDuration'>
                  <b>Duration:</b>
                  {course.course_id.duration}
                </div>
                <div className='myCourseCategory'>
                  <b>Category:</b>
                  {course.course_id.category}
                </div>
                <div className='myCourseCreatedAt'>
                  <b>Created At:</b>
                  {new Date(course.course_id.createAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
