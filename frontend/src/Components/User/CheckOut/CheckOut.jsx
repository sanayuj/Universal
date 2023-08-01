import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import * as Yup from "yup";
import { getCourseById } from "../../../Services/userApi";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../Components/User/Header/Header";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { buyCourseInCheckOut } from "../../../Services/userApi";
import { verifyApi } from "../../../Services/userApi";
import useRazorpay from "react-razorpay";

export default function CheckOut() {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const Razorpay = useRazorpay();
  const [date, setDate] = useState(null);
  const { courseId } = useParams();
  const [verifiedOrderId,setVerifiedOrderId]=useState(null)
  let formattedDate;

  useEffect(() => {
    getCourseById(courseId)
      .then((response) => {
        setCourse(response.data.course);
        const createdAt = response.data.course.createAt;
        formattedDate = new Date(createdAt).toLocaleString(undefined, {
          year: "numeric",
          month: "long",
        });
        setDate(formattedDate);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [courseId]);

  const initialValues = {
    country: "",
    state: "",
    paymentMethod: "",
  };

  const initPayment = async (data, course, bookingDetails) => {
    try {
      const amount = data.order.amount;
      const courseId = course._id;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: data.order.currency,
        name: course.name,
        order_id: data.order.id,

        handler: async (response) => {

          try {
            const { data } = await verifyApi(response, courseId, amount, bookingDetails);

           setVerifiedOrderId(data.orderId)
            toast.success("Order successfully placed", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate(`/paymentSucess/${data.courseId}/${data.orderId}`);

          } catch (error) {
            toast.error(error.message);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      });
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      const bookingDetails = values;
      const { data } = await buyCourseInCheckOut(courseId);
      if (values.paymentMethod === "Online Payment") {
        initPayment(data, course, bookingDetails);
      } else {
        toast.error("Payment method temporarily unavailable");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const validationSchema = Yup.object({
    country: Yup.string().required("* This field is required"),
    state: Yup.string().required("* This field is required"),
    paymentMethod: Yup.string().required("* This field is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <Header />
      <form onSubmit={formik.handleSubmit}>
        {course && (
          <div className="mainContentOne ">
            <div className="leftSideCheck container-fluid">
              <h2 className="mainHeadingCheck">Checkout</h2>
              <h3 className="subHeadingCheck">
                <b>Billing address</b>
              </h3>
              <div className="inputBox ">
                <div>
                  <label className="firstLabel">State/Union Territory</label>
                  <div className="firstBox ">
                    <input
                      className="firstInput"
                      type="text"
                      id="formuserName1"
                      placeholder=""
                      name="state"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.state}
                    />
                  </div>
                  {formik.touched.state && formik.errors.state && (
                    <div className="error">{formik.errors.state}</div>
                  )}
                </div>
                <div>
                  <label className="secondLabel">Country</label>
                  <div className="secondBox ">
                    <input
                      className="secondInput"
                      type="text"
                      id="formuserName1"
                      placeholder=""
                      name="country"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                    />
                  </div>
                  {formik.touched.country && formik.errors.country && (
                    <div className="error">{formik.errors.country}</div>
                  )}
                </div>
              </div>
              <p className="message">
                Universal is required by law to collect applicable transaction
                taxes for purchases made in certain tax jurisdictions.
              </p>

              <div className="paymentMethod">
                <h3 className="subHeading">
                  <b>Payment method</b>
                </h3>
                {formik.touched.paymentMethod &&
                  formik.errors.paymentMethod && (
                    <div className="error">{formik.errors.paymentMethod}</div>
                  )}
                <div className="methodOption1">
                  <label className="radio-label">
                    <input
                      className="radio"
                      type="radio"
                      name="paymentMethod"
                      value="Online Payment"
                      checked={formik.values.paymentMethod === "Online Payment"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    Online Payment
                  </label>
                </div>

                <div className="methodOption1">
                  <label className="radio-label">
                    <input
                      className="radio"
                      type="radio"
                      name="paymentMethod"
                      value="Apple Wallets"
                      checked={formik.values.paymentMethod === "Apple Wallets"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      // disabled // Disable the Apple Wallets option
                    />
                    Apple Wallets
                    <span className="instruction">
                      {" "}
                      (temporarily unavailable)
                    </span>
                  </label>
                </div>
              </div>

              <div className="orderDetails">
                <h3 className="mainHeadingThree">
                  <b>Order details</b>
                </h3>
                <div className="checkCourseDetails">
                  <div className="CheckImage">
                    <img
                      className="CheckImage"
                      src={`${process.env.REACT_APP_COURSE_IMAGE_PATH}/${course.image}`}
                      alt={course.name}
                    />
                  </div>
                  <div className="detailsAndPrice">
                    <div>
                      <p>
                        <b>{course.name}</b>
                      </p>
                      <div className="timeAnddate">
                        <div className="courseTime">
                          <p>
                            <b>Total hours {course.duration}</b>
                          </p>
                        </div>
                        <div>
                          <p>{date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="CoursePrice">₹{course.price}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightSide container-fluid">
              <div>
                <h3 className="rightHeading">
                  <b>Summary</b>
                </h3>
                <div className="summaryBox">
                  <div className="details">
                    <div className="price">
                      <div className="priceOne">
                        <p>Price:</p>
                      </div>
                      <div>₹{course.price}</div>
                    </div>
                    <hr />
                    <div className="total">
                      <div>
                        <p className="totalOne">Total:</p>
                      </div>{" "}
                      <div>₹{course.price}</div>
                    </div>
                    <p className="terms">
                      By completing your purchase you agree to these Terms of
                      Service.
                    </p>
                    <button className="Submit" type="submit">
                      Complete checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
