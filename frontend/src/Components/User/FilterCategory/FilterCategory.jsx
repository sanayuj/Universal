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
  );
}
