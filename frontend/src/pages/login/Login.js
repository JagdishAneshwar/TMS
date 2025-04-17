import React, { useState } from "react";
import "./_login.scss";
import Input from "../../components/input/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../features/component/button/Button";

const Login = () => {
  let history = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const onClickLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("https://api-tms.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("code", data.user.code);
      history("/dashboard");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const loginFields = {
    email:{
      id: "email",
      label: "Email",   
      required: true,
      type: "email" 
    },
    password: {
      id: "password",
      label: "Password",
      required: true,
      type: "password"
    }
  }

    return (
      <section className="login-section">
      <div className="row g-0 login-container">
        <img className="login-img" src={require("../../res/image/google-deepmind-LaKwLAmcnBc-unsplash.jpg")} alt="login" />
        <div className="login col-7">
        <h1 className="login-title mb-5">Login</h1>
        <form className="auth" onSubmit={onClickLogin}>

        <div className="row">
      
      {
        Object.keys(loginFields).map((key) => ( 
          <Input wd="col-md-12" label={loginFields[key].label} type={loginFields[key].type} id={loginFields[key].id} value={credentials[key]} onChange={onChange} require={loginFields[key].required} />
        ))
        
      }
      
      </div>
          <Button value="Login"/>
        </form>
        <p>Not Signed Up? &nbsp; 
        <Link className="register-link" to="/register">
             Sign Up
          </Link>
          </p>
          </div>
      </div>
      </section>
    );
  };
export default Login
