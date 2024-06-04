import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../Components/TextInput";
import CustomLink from "../Components/CustomLink";
import callAPIOnButtonClick from "../api/CallAPI";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const navigate: any = useNavigate();
  const [userState, setUserState] = useState({
    userName: "",
    emailOfUser: "",
    password: "",
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
      type: "text",
      placeholder: "Enter Username",
      name: "userName",
      value: userState.userName,
      onChange: onChangeHandler,
    },
    {
      type: "email",
      placeholder: "Enter Email",
      name: "emailOfUser",
      value: userState.emailOfUser,
      onChange: onChangeHandler,
    },
    {
      type: "password",
      placeholder: "Enter password",
      name: "password",
      value: userState.password,
      onChange: onChangeHandler,
    },
  ];

  const callRegisterApiFunction = async () => {
    try {
      const response = await callAPIOnButtonClick(
        "POST",
        "http://localhost:4000/api/user/register",
        {
          userName: userState.userName,
          emailOfUser: userState.emailOfUser,
          password: userState.password,
        }
      );
      if (
        response?.dataFromBackend.message == "User registered Successfully !!!"
      )
        navigate("/");
      else console.log(response?.dataFromBackend.message);
    } catch (error) {
      console.log("Error occurred at register frontend: ", error);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <ToastContainer />
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
      <button type="submit" onClick={callRegisterApiFunction}>
        Submit
      </button>

      <CustomLink
        text={"Already registered?"}
        linkText={"Login Here"}
        navigateTo={"/"}
        className={"linkStyle"}
      />
    </div>
  );
};

export default Register;
