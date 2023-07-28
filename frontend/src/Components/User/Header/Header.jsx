import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { userHeader } from "../../../Services/userApi";
import { setUserDetails } from "../../../features/setUser";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
export default function Header() {
  const userLogOut = () => {
    localStorage.removeItem("jwt")
    navigate("/login")
}

  const navigate = useNavigate();
 
  const dispatch = useDispatch();
  useEffect((value) => {
    userHeader().then((response) => {
      if (response.data.status) {
        dispatch(setUserDetails(response.data.user));
      }
    });
  }, []);

  const user = useSelector((state) => state.user.value);

  const handleLoginClick = () => {
    // Navigate to the login route
    navigate("/login");
  };

  const handleSignupClick = () => {
    // Navigate to the signup route
    navigate("/signup");
  };

  const handleProfileClick = () => {
    console.log(user);
    navigate("/userProfile");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearch = () => {
    navigate("/searchPage");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg border-bottom">
        <div className="container-fluid ">
          <a
            className="navbar-brand CompanyName"
            href="#"
            onClick={handleHomeClick}
          >
            Universal
          </a>
         
          <div className="App">
            <div  onClick={handleSearch} className="search-bar-container">
              <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input className="topSearchInput" placeholder="Search for course"  disabled/>
              </div>
            </div>
          </div>
       
       
        </div>

        {user ? (
          <div className="d-flex">
            <div className="courseBlock">
              <Link to="/userOrders" className="myCourse">
                My course
              </Link>
            </div>
            <div>
              <button className="profileButton" onClick={handleProfileClick}>
                {user.username}
              </button>
             
            </div>
            <div className="userlogOutBtnDiv"> <button className="userloginBtn" onClick={userLogOut}>LogOut</button></div>
          </div>
        ) : (
          <div className="loginSignupBtn">
            <button className="loginButton" onClick={handleLoginClick}>
              Login
            </button>
            <button className="signupButton" onClick={handleSignupClick}>
              Signup
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
