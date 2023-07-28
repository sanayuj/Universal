
import { HiUsers } from "react-icons/hi";
import { AiFillPieChart } from "react-icons/ai";
import { AiFillFilePpt } from "react-icons/ai";
import {BiCategory} from "react-icons/bi"
import { useNavigate } from "react-router-dom";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./SideBar.css";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div>
      <SideNav
        className="sidenav"
        onSelect={(selected) => {
          navigate(selected);
        }}
      >
        <SideNav.Toggle className="toggle" />
        <SideNav.Nav defaultSelected="DashBoard">
          <NavItem eventKey="/admin/">
            <NavIcon>
              <AiFillPieChart size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Home</NavText>
            <NavItem eventKey="/admin/">
              <NavIcon></NavIcon>
              <NavText>Sale chart</NavText>
            </NavItem>
            <NavItem eventKey="/admin/bookingHistroy">
              <NavIcon></NavIcon>
              <NavText>Booking Histroy</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <HiUsers size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Students</NavText>
            <NavItem eventKey="/admin/listuser">
              <NavIcon></NavIcon>
              <NavText>Users List</NavText>
            </NavItem>
            
          </NavItem>
          <NavItem eventKey="/">
            <NavIcon>
              <AiFillFilePpt size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>All Course</NavText>
            <NavItem eventKey="/admin/listCourse">
              <NavIcon></NavIcon>
              <NavText>List Course</NavText>
            </NavItem>
            <NavItem eventKey="/admin/addcourse">
              <NavIcon></NavIcon>
              <NavText>Add Course</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="/admin/addcategory">
            <NavIcon>
              <BiCategory size={20} className="sidebarIcon" />
            </NavIcon>
            <NavText>Category</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}

export default Sidebar;