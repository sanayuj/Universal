import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { verifyOtp } from "../../../Services/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./otp.css";

export default function App() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { data } = await verifyOtp(otp);

    if (data.status) {
      console.log("return");
      localStorage.setItem("jwt", data.token);
      toast(data.message);

      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100">
      <div className="border outer d-flex justify-content-center align-items-center flex-column ">
        <div className="text-center text-dark mb-4">
          {" "}
          <h3>Verify your OTP</h3>
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
            border: "1px blue solid ",
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
            // padding: 7px 24px,
            // margin-top: 24px,
            // margin-left: 89px,
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>
    </div>
  );
}
