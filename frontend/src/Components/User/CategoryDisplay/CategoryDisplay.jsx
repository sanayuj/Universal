import React, { useEffect } from "react";
import "./CategoryDisplay.css";
import { getCourseByCategoryId } from "../../../Services/userApi";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Footer from "../Footer/Footer";
export default function CategoryDisplay() {
  const { categoryId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [currectPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const limit = 1;

  useEffect(() => {
    getCourseByCategoryId(categoryId, limit, currectPage)
      .then((response) => {
        setCourseDetails(response.data.categoryCourse);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [currectPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; // Invalid page number, do nothing
    }

    setCurrentPage(pageNumber);
  };

  const handleCourseClick = () => {};

  return (
    <div>
      <Header />
      <div className="categoryMainContent">
        <h4>{categoryId}</h4>

        <div className="row">
          {courseDetails && courseDetails.length ? (
            courseDetails.map((value, index) => {

              return (
                <div
                  className="courseDiv "
                  key={value?._id}
                  onClick={() => handleCourseClick(value?._id)}
                >
                  <div>
                    {" "}
                    <img
                      className="coursePhoto"
                      src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${value?.image}`}
                    />
                  </div>
                  <div className="text">
                    <p className="CourseHeading">
                      <b>{value?.name}</b>
                    </p>
                    <p className="CourseAbout">{value?.about}</p>
                    <p className="CoursePrice">
                      ₹{value?.price}
                      <br />
                      <span className="time">
                        {value?.duration} total hours
                      </span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              {" "}
              <div className="nullTest">Sorry,Currectly Unavailable!</div>
              <div className=" nullImage ">
                <img className="image" src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/nullImage1.svg`} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      {totalPages != null && totalPages > 0 && (
        <div className="paginationMainDiv">
          <nav aria-label="Page navigation example">
            <ul class="pagination">


              <li class="page-item">
                <button class="page-link" href="#" aria-label="Previous"
                 onClick={() =>{ handlePageChange(currectPage - 1);document.activeElement.blur();}} >
                
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                 
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <li key={pageNumber} class="page-item">
                    <button
                      class="page-link"
                      href="#"
                      onClick={() =>{ handlePageChange(pageNumber);document.activeElement.blur();}}
                    >
                      {pageNumber}
                    </button>
                  </li>
                )
              )}
              <li class="page-item">
                <button class="page-link" href="#"  onClick={() =>{ handlePageChange(currectPage + 1);document.activeElement.blur();}} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                 
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <Footer />
    </div>
  );
}
