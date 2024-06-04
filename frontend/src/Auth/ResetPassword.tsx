import { useState } from "react";
import TextInput from "../Components/TextInput";
import callAPIOnButtonClick from "../api/CallAPI";
import { useNavigate, useParams } from "react-router";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userState, setUserState] = useState({
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const propsArray = [
    {
      type: "password",
      placeholder: "Enter new Password",
      name: "password",
      value: userState.password,
      onChange: onChangeHandler,
    },
    {
      type: "password",
      placeholder: "Confirm new Password",
      name: "confirmPassword",
      value: userState.confirmPassword,
      onChange: onChangeHandler,
    },
  ];

  const callResetPasswordApiFunction = async () => {
    try {
      if (userState.password !== userState.confirmPassword) {
        console.log("Password not match !!!");
      } else {
        const response = await callAPIOnButtonClick(
          "PUT",
          `http://localhost:4000/api/user/resetPassword/${params.userId}`,
          {
            password: userState.password,

          }
        );
        if (
          response?.dataFromBackend.message == "Password Reset Successfully !!!"
        ) {
          navigate("/");
        } else {
          console.log("Password not reset !!!");
        }
      }
    } catch (error) {
      console.log("Error occurred at forgot password frontend: ", error);
    }
  };

  return (
    <div className="card">
      <h2>Reset Password</h2>
      {propsArray.map((val: any, index: any) => (
        <TextInput
          key={index}
          type={val.type}
          name={val.name}
          placeholder={val.placeholder}
          value={val.value}
          onChange={val.onChange}
        />
      ))}
      <button type="submit" onClick={callResetPasswordApiFunction}>
        Submit
      </button>
    </div>
  );
};

export default ResetPassword;
