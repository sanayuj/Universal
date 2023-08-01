import React, { useEffect, useState } from "react";
import "./BookingHistroy.css";
import { BookingHistroyDetails } from "../../../Services/adminApi";
import Sidebar from "../SideBar/SideBar";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function BookingHistory() {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BookingHistroyDetails();
        setBookingDetails(response.data.BookingDetails);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  function handleButton(orderId) {
    navigate(`/admin/bookingHistoryMainPage/${orderId}`);
  }

  return (
    <div>
      <Sidebar />
      <AdminNavBar />
      <div className="bookingMainContent">Order History</div>
      {bookingDetails && bookingDetails.length > 0 ? (
      <div className="tableOne">
        <table className="table ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Username</th>
              <th scope="col">Buy date</th>
              <th scope="col">Payment method</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails?.map((value, index) => (
              <tr>
                <td>{value?.course_id.name}</td>
                <td>{value?.user_id?.username}</td>
                <td className="date">{value?.booked_At}</td>
                <td>{value?.booking_details[0].payment_method}</td>
                <td>
                  <button
                    onClick={() => handleButton(value?._id)}
                    className="viewButton"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ):(
        <p className="bookingMainContent">No Course Found</p>
      )}
    </div>
  );
}
