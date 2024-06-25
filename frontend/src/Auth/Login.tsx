import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../Components/TextInput";
import CustomLink from "../Components/CustomLink";
import callAPIOnButtonClick from "../api/CallAPI";

const Login = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState({
    userNameOrEmail: "",
    password: "",
  });

  const token = localStorage.getItem("token");
  const flag = localStorage.getItem("flag");

  useEffect(() => {
    if(token!==null && flag) navigate("/viewUsers")
    if(token!==null && !flag) navigate("/home")
  }, [])
  
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
      placeholder: "Email or Username",
      name: "userNameOrEmail",
      value: userState.userNameOrEmail,
      onChange: onChangeHandler,
    },
    {
      type: "password",
      placeholder: "Email or Username",
      name: "password",
      value: userState.password,
      onChange: onChangeHandler,
    },
  ];

  const callLoginApiFunction = async () => {
    try {
      const response = await callAPIOnButtonClick(
        "POST",
        "http://localhost:4000/api/user/login",
        {
          userNameOrEmail: userState.userNameOrEmail,
          password: userState.password,
        }
      );
     const {token,flag}:any = response?.dataFromBackend;
     if(token!=="Invalid Credentials !!!"){
        localStorage.setItem("token",token)
        localStorage.setItem("flag",flag);
        if(flag) navigate("/viewUsers")
        if(!flag) navigate("/home")
     }
    } catch (error) {
      console.log("Error occurred at login frontend: ", error);
    }
  };
  return (
    <div className="card-outer">
      <div className="card">
        <h2>Login</h2>
        {propsArray.map((val: any, index: any) => (
          <TextInput
            key={index}
            type={val.type}
            placeholder={val.placeholder}
            name={val.name}
            value={val.value}
            onChange={val.onChange}
          />
        ))}
        <button type="submit" onClick={callLoginApiFunction}>
          Submit
        </button>

        <CustomLink
          text={"New here?"}
          linkText={"Register here"}
          navigateTo={"/register"}
          className={"linkStyle"}
        />

        <br></br>
        <br></br>

        <CustomLink
          linkText={"Forget Password"}
          navigateTo={"/forgetPassword"}
          className={"forgetPasswordLinkStyle"}
        />
      </div>
    </div>
  );
};

export default Login;
