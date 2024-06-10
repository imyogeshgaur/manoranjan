import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../Components/TextInput";
import CustomLink from "../Components/CustomLink";
import callAPIOnButtonClick from "../api/CallAPI";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [emailOfUser, setEmailOfUser] = useState("");

  const callForgotPasswordApiFunction = async () => {
    try {
      const response = await callAPIOnButtonClick(
        "POST",
        "http://localhost:4000/api/user/forgetPassword",
        {
          emailOfUser,
        }
      );
      if (response?.dataFromBackend.message == "Email Sent Successfully !!!") {
        navigate("/");
      } else {
        console.log(response?.dataFromBackend.message);
      }
    } catch (error) {
      console.log("Error occurred at forgot password frontend: ", error);
    }
  };

  return (
    <div className="card-outer">
      <div className="card">
        <h2>Forget Password</h2>
        <TextInput
          placeholder={"Enter Email"}
          type="email"
          value={emailOfUser}
          onChange={(e: any) => setEmailOfUser(e.target.value)}
        />

        <button type="submit" onClick={callForgotPasswordApiFunction}>
          Submit
        </button>

        <CustomLink
          className={"backLinkStyle"}
          navigateTo={"/"}
          linkText={"Back to login"}
        />
      </div>
    </div>
  );
};

export default ForgetPassword;
