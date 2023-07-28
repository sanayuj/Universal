import { Routes,Route } from "react-router-dom";
import UserHomePage from '../Pages/User/userHomePage'
import UserLoginPage from '../Pages/User/userLoginpage'
import UserSignupPage from '../Pages/User/userSignupPage'
import UserOtpPage from "../Pages/User/userOtpPage";
import UserForgotpassword from "../Pages/User/userForgotPassword"
import UserForgotOtp from "../Pages/User/userforgotOtp"
import UserPasswordEdit from "../Pages/User/userEditPassword"
import UserProfile from "../Pages/User/userProfilePage"
import UserCourseMainPage from "../Pages/User/userProductMainPage"
import UserCheckoutPage from "../Pages/User/userCheckoutPage";
import UserPaymentSucess from "../Pages/User/userOrderSuccess"
import UserOrderPage from "../Pages/User/userOrderPage"
import UserWatchCourse from "../Pages/User/userWatchCoursePage"
import UserSearchPage from "../Pages/User/userSearchPage"
import UserCategoryDisplay from "../Pages/User/userCategoryDisplay";

function UserRouter(){
    return(
        <Routes>
            <Route path='/' element={<UserHomePage/>}/>
            <Route path="/login" element={<UserLoginPage/>}/>
            <Route path="/signup" element={<UserSignupPage/>}/>
            <Route path="/otp" element={<UserOtpPage/>}/>
            <Route path="/forgotpassword" element={<UserForgotpassword/>}/>
            <Route path="/forgotOtp" element={<UserForgotOtp/>}/>
            <Route path="/editPassword" element={<UserPasswordEdit/>}/>
            <Route path="/userProfile" element={<UserProfile/>}/>
            <Route path="/course/courseMainPage/:courseId" element={<UserCourseMainPage/>}/>
            <Route path="/checkout/:courseId" element={<UserCheckoutPage/>}/>
            <Route path="/paymentSucess/:courseId/:orderId" element={<UserPaymentSucess />} />
            <Route path="/userOrders" element={<UserOrderPage/>}/>
            <Route path="/watchcourse/:courseId" element={<UserWatchCourse/>}/>
            <Route path="/searchPage" element={<UserSearchPage/>}/>
            <Route path="/filterproductDisplay/:categoryId" element={<UserCategoryDisplay/>}/>
        </Routes>
    )
}

export default UserRouter