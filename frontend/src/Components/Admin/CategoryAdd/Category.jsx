import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "./Category.css"
import {addCategory} from '../../../Services/adminApi'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import Sidebar from "../SideBar/SideBar";

function AdminLogin() {
  const navigate = useNavigate();
  const [image,setImage]=useState("")


  const initialValues = {
    image: "",
    category: "",
  };
  function viewCategoryBtn(){
    navigate("/admin/viewCategories")
  }

  const validationSchema = Yup.object({
    image: Yup.mixed()
    .required("*Image Required")
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
    ),
      
    category: Yup.string().required("* This field is requires"),
  });
  const onSubmit = async (values) => {
    console.log(values.image,"OnCate----->")
    try {
      const { data } = await addCategory(values);
      console.log(data,"DATA !!!!!!!")
      if (data.status) {
        
        toast.success(data.message);
        navigate("/admin/");
      } else {
        toast.error(data.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast(error.message);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });



  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage("image", file);
    formik.setFieldValue("image", file);
  };
  return (
<div>
<AdminNavBar/>
<Sidebar/>
    <div class="main_div">
<button className="viewCategoryBtn" onClick={()=>viewCategoryBtn()}>View Category</button>
  
      <form class="form" onSubmit={formik.handleSubmit}>
      <div className="mb-4">
                  <label for="formFileDisabled" class="form-label">
                    Upload Image for Category
                  </label>
                  <input
                    class="form-control "
                    type="file"
                    name="image"
                    onBlur={formik.handleBlur}
                    id="formFileDisabled"
                    onChange={(e) => {
                      handleImage(e);
                      setImage(e.target.files[0]);
                    }}
                  />
                  {formik.touched.image && formik.errors.image ? (
                    <p className="text-danger small">{formik.errors.image}</p>
                  ) : null}
                </div>

        <div class="form-outline mb-4">
        
          <input
            type="text"
            id="form2Example2"
            className="form-control"
            placeholder="Category Name"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          />
           {formik.touched.category && formik.errors.category ? (
                    <p className="text-danger small">{formik.errors.category}</p>
                  ) : null}
        </div>

        <div class="row mb-1">
          <div class="col d-flex justify-content-center"></div>
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
         Submit
        </button>

      
        
      </form>
     
    </div>
   
    </div>
  );
}

export default AdminLogin;
