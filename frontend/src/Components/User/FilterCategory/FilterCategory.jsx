import React, { useState, useEffect } from "react";
import "./FilterCategory.css";
import { getCategory } from "../../../Services/userApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function FilterCategory() {
  const navigate = useNavigate();

  const handleCategory = (categoryId) => {
    navigate(`/filterproductDisplay/${categoryId}`);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory()
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  return (

    <div>
    {categories.length >0 ?
    <div>
      <div className="fliterMainDev">
        {categories.map((value) => (
          <div key={value?._id} className="itemName">
            <Link
              to={`/filterproductDisplay/${value.categoryName}`}
              className="categoryLink"
            >
              {value?.categoryName}
            </Link>
          </div>
        ))}
      </div>
      </div>
      :  <div class="d-flex justify-content-center align-items-center vh-100">
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>}
    </div>

  );
}
