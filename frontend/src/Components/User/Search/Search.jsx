import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { search } from "../../../Services/userApi";
import "./Search.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import CategoryDisplay from "../FilterCategory/FilterCategory";
export default function Search() {
  const [course, setCourse] = useState(null);
  const [query, setQuery] = useState("");
  const [currectPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState(0);
  const limit = 8;
  const navigate=useNavigate()

  const handleSearch = () => {
    try {
      if (query != "") {
        search(query, limit, currectPage)
          .then((response) => {
            setCourse(response.data.Data);
            setTotalPage(response.data.totalPages);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; // Invalid page number, do nothing
    }
    setCurrentPage(pageNumber);
  };

  const handleShowCourse=(courseId)=>{
    
    navigate(`/course/courseMainPage/${courseId}`)
  }

  return (
    

    <div>
      <Header />
      <CategoryDisplay/>

      <div>
        <div className="mainContent">
          <div className="searchBar">
            {" "}
            <input
              className="topSearchInput"
              placeholder="Search for course"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div
              onClick={handleSearch}
              className="searchBtn  p-4 cursor-pointer mx-2 rounded-circle"
            >
              <FaSearch id="seachIcon" />
            </div>
          </div>
        </div>

        <div className="searchResult">
       
          {course ? (
            <div className="row mx-3 lg:mx-auto mb-8">
            <h3 className="ml-5 text-2xl md:text-3xl">
                {course ? course.length : "0"} results for “{query}”
              </h3>
            </div>
          ) : (
            <div className="container searchText">
            <div>
            <h3 className="ml-5 text-2xl md:text-3xl">
                Search what do you want to learn
              </h3>
            </div>
              
              <div>

              <p className="ml-5 text-2xl md:text-3xl">
                {course ? course.length : "No Course found! "} 
              </p>
              </div>
             
            
            </div>
          )}
          <div className="container">
            <div className="row">
              {course && course.length ? (
                course.map((value, index) => {
                  return (
                    <div onClick={()=>{handleShowCourse(value._id)}} className="courseDiv " key={value._id}>
                      <div>
                        {" "}
                        <img
                          className="coursePhoto"
                          src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${value.image}`}
                        />
                      </div>
                      <div className="text">
                        <p className="CourseHeading">
                          <b>{value.name}</b>
                        </p>
                        <p className="CourseAbout">{value.about}</p>
                        <p className="CoursePrice">
                          ₹{value.price}
                          <br />
                          <span className="time">
                            {value.duration} total hours
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className=" nullImage ">
                  <img className="image" src="/Images/nullImage1.svg" alt="" />
                </div>
              )}
              {totalPages != null && totalPages > 0 && (
                <div className="paginationMainDiv">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li class="page-item">
                        <button
                          class="page-link"
                          href="#"
                          aria-label="Previous"
                          onClick={() => {
                            handlePageChange(currectPage - 1);
                            document.activeElement.blur();
                          }}
                        >
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">Previous</span>
                        </button>
                      </li>

                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((pageNumber) => (
                        <li key={pageNumber} class="page-item">
                          <button
                            class="page-link"
                            href="#"
                            onClick={() => {
                              handlePageChange(pageNumber);
                              document.activeElement.blur();
                            }}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      ))}
                      <li class="page-item">
                        <button
                          class="page-link"
                          href="#"
                          onClick={() => {
                            handlePageChange(currectPage + 1);
                            document.activeElement.blur();
                          }}
                          aria-label="Next"
                        >
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Next</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
