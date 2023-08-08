import React, { useState, useEffect } from "react";
import "./ViewCategories.css";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import Sidebar from "../SideBar/SideBar";
import { getCategoryList } from "../../../Services/adminApi";
import { toast } from "react-toastify";
import "./ViewCategories.css";

export default function ViewCategories() {
  const [categoryDetail, setCategoryDetails] = useState();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategoryList();
        // Update the state with the fetched data
        setCategoryDetails(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // Handle the error properly
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  // Rest of the component code
  if (!Loading) {
    return (
      <div>
        <AdminNavBar />
        <Sidebar />
        <h4 className="pageHeading">Categories</h4>
        <div className="row categoryDiv">
          {categoryDetail && categoryDetail ? (
            categoryDetail.map((value, index) => {
              return (
                <div className="categoriesDiv " key={value._id}>
                  <div>
                    {" "}
                    <img
                      className="coursePhoto"
                      src={`${process.env.REACT_APP_BASE_URL}/${value.imageUrl}`}
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
          ) : (
            <p className="pageHeading">No categories found!</p>
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
