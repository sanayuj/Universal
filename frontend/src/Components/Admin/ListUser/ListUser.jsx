import React, { useEffect, useState } from "react";
import "./ListUser.css";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import { Link } from "react-router-dom";
import { getAllUser } from "../../../Services/adminApi";
import Sidebar from "../SideBar/SideBar";
import { toast } from "react-toastify";
import { userDisabled } from "../../../Services/adminApi";

import "react-toastify/dist/ReactToastify.css";

export default function ListUser() {

  const userDisable = async (id) => {
    try {
      const { data } = await userDisabled(id);
      console.log(data, "STATUS!");
      if (data.status) {
        toast(data.message);
       
      } else {
        toast("User Enable Successfully");

      }
    } catch (error) {
      console.log(error);
    }
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUser()
      .then((response) => {
        setUsers(response.data.User);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <div>
      <AdminNavBar />
      <Sidebar />
      <div className="content-div">
        <h3>Users</h3>
        {users?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
               
                <tr className{...user.blockStatus?"userRow":""}  key={user?._id}>

                  <td >{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phonenumber}</td>
                  <td>
                    <div>
                      <button
                        onClick={() => userDisable(user._id)}
                        className={user?.blockStatus ? "enablebtn" : "disablebtn"}
                      >
                        {user?.blockStatus ? "Unblock" : "Block"}
                      </button>
                      
                    </div>
                  </td>
                 
                </tr>
                
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-users">No users found.</p>
        )}
      </div>
    </div>
  );
}
