import React, { useState } from "react";
import Button from "../../features/component/button/Button";
import Input from "../../components/input/Input";
import "./_register.scss";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let history = useNavigate();
    const [credentials, setCredentials] = useState({
      password: "",
      passwordConfirmation: "",
      name: "",
      mobile: "",
      email: "",
      dob: "",
      doj: "",
      ad: "",
      role: "",
      address: "",
      pincode: "",
      city: "",
      skillset: "",
      code: "",
      gender: "",
      salary: "",
      dept: ""
  });

  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const { password,
        passwordConfirmation,
        name,
        mobile,
        email,
        dob,
        doj,
        ad,
        role,
        address,
        pincode,
        city,
        skillset,
        code,
        gender,
        salary,
        dept
       } = credentials;

    const onClickSignUp = async (e) => {
      e.preventDefault();
      const res = await fetch("https://api-tms.vercel.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
              password,
              passwordConfirmation,
              name,
              mobile,
              email,
              dob,
              doj,
              ad,
              role,
              address,
              pincode,
              city,
              skillset,
              code,
              gender,
              salary,
              dept
           }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        history("/");
      }
    };


    const signupFields = {
      name:{
        id: "name",
        label: "Name",   
        required: true,
        type: "text" 
      },
      mobile:{
        id: "mobile",
        label: "Phone Number",
        required: true,
        type: "tel"
      },
      email: {
        id: "email",
        label: "Email Id",
        required: true,
        type: "email"
      },
      password: {
        id: "password",
        label: "Password",
        required: true,
        type: "password"
      },
      passwordConfirmation: {
        id: "passwordConfirmation",
        label: "Confirm your Password",
        required: true,
        type: "password"
      },
      dob:{
        id: "dob",
        label: "Date Of Birth",
        required: true,
        type: "date"
      },
     doj: {
        id: "doj",
        label: "Joining Date",
        required: true,
        type: "date"
      },
      ad:{
        id: "ad",
        label: "Aniversary Date",
        required: false,
        type: "date"
      },
      role:{
        id: "role",
        label: "Role",
        required: true,
        type: "text"
      },
      address:{
        id: "address",
        label: "Street",
        required: true,
        type: "text"
      },
      pincode:{
        id: "pincode",
        label: "Pincode",
        required: true,
        type: "number"
      },
      city:{
        id: "city",
        label: "City",
        required: true,
        type: "text"
      },
      // skillset: [
      //   {
      //     type: Array,
      //     default: [],
      //   },
      // ],
      code:{
        id: "code",
        label: "Code",
        required: true,
        type: "text"
      },
      gender:{
        id: "gender",
        label: "Gender",
        required: true,
        type: "text"
      },
      salary:{
        id: "salary",
        label: "Salary",
        required: true,
        type: "number"
      },
      // dept:{
      //   id: "salary",
      //   label: "Salary",
      //   type: "number"
      // },
    };



    

  return (
    <section className="register-section">
    <div className="row g-0 register-container">
    <img className="register-img" src={require("../../res/image/web-bw.jpg")} alt="login" />
    <div className="register col-7">
      <h1 className="register-title">SignUp</h1>
      <form className="auth" onSubmit={onClickSignUp}>
      <div className="row">
      
      {
        Object.keys(signupFields).map((key) => ( 
          <Input wd="col-md-6" label={signupFields[key].label} type={signupFields[key].type} id={signupFields[key].id} value={credentials[key]} onChange={onChange} require={signupFields[key].required} />
          
        ))
        
      }
      
      </div>
        <Button value="Register"/>
      </form>
      <p>Already registered? &nbsp;         
          <Link className="login-link" to="/login">
            Login
          </Link>
          </p>
          </div>
    </div>
    </section>
  );
};

export default Signup;
