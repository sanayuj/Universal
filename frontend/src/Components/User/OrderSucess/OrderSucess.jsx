import React, { useEffect, useState } from "react";
import "./OrderSucess.css";

import { getOrderDetails } from "../../../Services/userApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function OrderSucess() {
  const { courseId, orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderDetails1, setOrderDetails1] = useState(null);
  const navigate = useNavigate();

  function gotoUserOrderhandler() {
    navigate("/userOrders");
  }

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const details = await getOrderDetails(courseId,orderId);
        console.log(details.data, "DATA------>");
        

        if (details.data.status) {
          setOrderDetails(details.data.course);
          setOrderDetails1(details.data.orderDetails);
        } else {
          toast.error(details.data.message);
        }
      } catch (error) {
        toast(error);
      }
    };
    fetchOrderDetails();
  }, []);

  return (
    <div>
      {orderDetails && (
        <div className="container mt-4 mb-4">
          <div className="row d-flex cart align-items-center justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="d-flex justify-content-center border-bottom">
                  <div className="p-3">
                    <div className="progresses">
                      <div className="steps">
                        {" "}
                        <span>
                          <i className="fa fa-check"></i>
                        </span>{" "}
                      </div>{" "}
                      <span className="line"></span>
                      <div className="steps">
                        {" "}
                        <span>
                          <i className="fa fa-check"></i>
                        </span>{" "}
                      </div>{" "}
                      <span className="line"></span>
                      <div className="steps">
                        {" "}
                        <span className="font-weight-bold">3</span>{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-0">
                  <div className="col-md-6 border-right p-5">
                    <div className="text-center order-details">
                      <div className="d-flex justify-content-center mb-5 flex-column align-items-center">
                        {" "}
                        <span className="check1">
                          <i className="fa fa-check"></i>
                        </span>{" "}
                        <span className="font-weight-bold">
                          <b>Congratulations</b>
                        </span>{" "}
                        <small className="mt-2">
                          "Live as if you were to die tomorrow. Learn as if you
                          were to live forever"
                        </small>{" "}
                        <a
                          href="#"
                          className="text-decoration-none invoice-link"
                        >
                          {/* View Invoice */}
                        </a>{" "}
                      </div>{" "}
                      <button
                        onClick={() => {
                          gotoUserOrderhandler();
                        }}
                        className="order-button"
                      >
                        Go to Order
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6 background-muted">
                    <div className="p-3 border-bottom">
                      <div className="d-flex justify-content-between align-items-center">
                        {" "}
                        <span className="date">
                          <i className="fa fa-clock-o text-muted"></i>{" "}
                          {orderDetails1.booked_At}
                        </span>{" "}
                        <span></span>{" "}
                      </div>
                      <div className="mt-3">
                        <h6 className="mb-0">{orderDetails.name}</h6>{" "}
                        <span className="d-block mb-0">
                          {orderDetails.about}{" "}
                        </span>{" "}
                        <small>
                          Duration: {`${orderDetails.duration} hours`}
                        </small>
                        {orderDetails &&
                          orderDetails.course &&
                          orderDetails.booking_details && (
                            <div className="d-flex flex-column mt-3">
                              {orderDetails.course.language.map(
                                (value) => (
                                  <small key={value.payment_method}>
                                    <i className="fa fa-check text-muted"></i>{" "}
                                    {value.payment_method}
                                  </small>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="row g-0 border-bottom">
                      <div className="col-md-6">
                        <div className="p-3 d-flex justify-content-center align-items-center">
                          {" "}
                          <span>Subtotal</span>{" "}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 d-flex justify-content-center align-items-center">
                          {" "}
                          <span>
                            ₹ {`${orderDetails.price}`}
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row g-0 border-bottom">
                      <div className="col-md-6">
                        <div className="p-3 d-flex justify-content-center align-items-center">
                          {" "}
                          <span>Processing fees</span>{" "}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 d-flex justify-content-center align-items-center">
                          {" "}
                          <span>₹ 0</span>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row g-0">
                      <div className="col-md-6">
                        <div className="p-3 d-flex justify-content-center align-items-center">
                          {" "}
                          <span className="font-weight-bold">Total</span>{" "}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-3 d-flex justify-content-center align-items-center">
                          {" "}
                          <span className="font-weight-bold">
                            ₹ {`${orderDetails.price}`}
                          </span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div> </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
