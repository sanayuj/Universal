import React, { useState, useEffect } from 'react';
import "./ViewCategories.css";
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import Sidebar from '../SideBar/SideBar';
import { getCategoryList } from "../../../Services/adminApi";
import { toast } from 'react-toastify';
import "./ViewCategories.css"

export default function ViewCategories() {
  const [categoryDetail, setCategoryDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryList();
        // Update the state with the fetched data
        setCategoryDetails(response.data. categories);
      } catch (error) {
        console.log(error)
        // Handle the error properly
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);
 
  // Rest of the component code

  return (<div>
  <AdminNavBar/>
  <Sidebar/>
  <h4 className='pageHeading'>Categories</h4>
    <div className="row categoryDiv">
   
    {categoryDetail && categoryDetail
      ? categoryDetail.map((value, index) => {
          return (
            <div className="categoriesDiv " key={value._id} >
              <div>
                {" "}
                <img
                  className="coursePhoto"
                  src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${value.imageUrl}`}
                />
              </div>
              <div className="text">
                <p className="CourseHeading">
                  <b>{value.categoryName}</b>
                </p>
               
              </div>
            </div>
          );
        })
      : <p className='pageHeading'>No categories found!</p>}
  </div>
  </div>
  );
}
