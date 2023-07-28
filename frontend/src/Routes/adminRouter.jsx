import { Routes,Route } from "react-router-dom";



import AdminLoginPage from '../Pages/Admin/adminLoginPage'
import AdminHomePage from "../Pages/Admin/adminHomePage";
import AdminCourseAdd from "../Pages/Admin/adminCourseAdd";
import AdminCategoryAdd from "../Pages/Admin/adminCategoryAdd";
import AdminListUser from "../Pages/Admin/adminListUser"
import AdminListCourse from "../Pages/Admin/adminListCourse"
import AdminCourseEdit from "../Pages/Admin/adminCourseEdit";
import AdminChart from "../Pages/Admin/adminChart"
import BookingHistory from "../Pages/Admin/adminBookingHistroy";
import BookingMainPage from "../Pages/Admin/adminMainBookingPage"
import ViewCategoryPage from "../Pages/Admin/adminViewCategories"

function AdminRouter(){
    return(
        <Routes>
            <Route path="/login" element={<AdminLoginPage/>}/>
            <Route path="/" element={<AdminChart/>}/>
            <Route path="/addcourse" element={<AdminCourseAdd/>}/>
            <Route path="/addCategory" element={<AdminCategoryAdd/>}/>
            <Route path="/listuser" element={<AdminListUser/>}/>
            <Route path="/listCourse" element={<AdminListCourse/>}/>
            <Route path="/courseEdit/:courseId" element={<AdminCourseEdit/>}/>
            <Route path="/bookingHistroy" element={<BookingHistory/>}/>
            <Route path="/bookingHistoryMainPage/:id" element={<BookingMainPage/>}/>
            <Route path="/viewCategories" element={<ViewCategoryPage/>}/>
           
        </Routes>
    )
}

export default AdminRouter