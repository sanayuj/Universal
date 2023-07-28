import React from "react";
import CourseAdd from "../../Components/Admin/CourseAdd/CourseAdd";
import Sidebar from "../../Components/Admin/SideBar/SideBar";
import Home from "../../Components/Admin/AdminNavBar/AdminNavBar";
export default function adminCourseAdd() {
  return (
    <div>
      <Home />
      <CourseAdd />
      <Sidebar />
    </div>
  );
}
