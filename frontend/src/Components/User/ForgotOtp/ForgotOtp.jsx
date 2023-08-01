import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Forgototp, reSendOTP } from "../../../Services/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ForgotOtp.css";

export default function App() {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (resendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [resendDisabled, timer]);

  const handleSubmit = async () => {
    try {
      const { data } = await Forgototp(otp);
      console.log(data, "/daattaa");
      if (data.status) {
        toast(data.message);
        navigate("/editPassword");
      } else {
        toast.error(data.message);
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resendhandleSubmit = async () => {
    setResendDisabled(true);
    try {

      const { data } = await reSendOTP();

      if (data.status) {
        toast(data.message);
      } else {
        toast.error(data.message);
      }
      setTimeout(() => {
        setResendDisabled(false);
        setTimer(60);
      }, 60000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border outer d-flex justify-content-center align-items-center flex-column">
        <div className="text-center text-dark mb-4">
          <h3>Verify your Account</h3>
        </div>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span style={{ width: "3px" }}></span>}
          renderInput={(props) => <input {...props} />}
          separator={<span style={{ width: "8px" }}></span>}
          isInputNum={true}
          shouldAutoFocus={true}
          containerStyle={"bg-#f5f0f0; p-3 "}
          inputStyle={{
            border: "1px red solid",
            borderRadius: "8px",
            width: "54px",
            height: "54px",
            fontSize: "20px",
            color: "#000",
            fontWeight: "400",
            caretColor: "blue",
          }}
          focusStyle={{
            border: "1px solid #CFD3DB",
            outline: "none",
          }}
        />
        <button
          className="button text-center"
          type="submit"
          style={{
            background: "#574cd4",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
        {resendDisabled ? (
          <div>{`Resend OTP in ${timer} seconds`}</div>
        ) : (
          <button
            className="button text-center"
            type="submit"
            style={{
              background: "#fff",
              color: "#000",
              border: "none",
              cursor: "pointer",
            }}
            onClick={resendhandleSubmit}
          >
            Resend
          </button>
        )}
      </div>
    </div>
  );
}
