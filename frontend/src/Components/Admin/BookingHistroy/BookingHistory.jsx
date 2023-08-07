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
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BookingHistroyDetails();
        setBookingDetails(response.data.BookingDetails);
        setLoading(false);
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
      {Loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="bookingMainContent">
          <h3>Order History</h3>
          {bookingDetails && bookingDetails.length > 0 ? (
            <div className="tableOne">
              <table className="table">
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
                  {bookingDetails.map((value, index) => (
                    <tr key={value?._id}>
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
          ) : (
            <p className="bookingMainContent">No Course Found</p>
          )}
        </div>
      )}
    </div>
  );
}
