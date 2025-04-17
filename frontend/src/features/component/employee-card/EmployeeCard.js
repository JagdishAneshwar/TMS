import React, { useState, useContext, useEffect } from 'react';
import "./_employeecard.scss";
import projectContext from '../../../context/project/projectContext';
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({        _id,
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
  gender,
  salary, img}) => {
  const context = useContext(projectContext);
  const { toDetailedEmployeedPage, attendances } = context;
  const today = new Date().toLocaleDateString('en-GB').replaceAll("/","-");

  // Filter attendances for today
  const usersAttendances = attendances.filter((attendance) => {
    return attendance.date == today && attendance.name == name;
  });
 
  const navigate = useNavigate();
  return (
    <div className='employee-info-card d-flex flex-row' onClick={() => {
      toDetailedEmployeedPage({
        _id,
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
        gender,
        salary}, navigate)}}>
        
        <img className='employee-img' src={img} alt="card-logo" />
        
        <div className='info-wrapper d-flex flex-row '>
        <div className='employee-name-role'>
        <h6>info</h6>
        <div className='employee-name'>Name: {name}</div>
        <div className='employee-role'>Role: {role}</div>
        <div className="employee-status">Status: {usersAttendances.length > 0 ? ( <span className="badge bg-success fs-10 rounded-pill">active</span>):( <span className="badge bg-danger fs-10 rounded-pill">inactive</span>)}</div>
        </div>
        <div className='age-gender'>
        <h6>Salary</h6>
        <div className='employee-age'>Salary: {salary}</div>
        <div className='employee-gender'>Role: {role}</div>
        </div>
        <div className='contact'>
        <h6>Contact</h6>
        <div className='employee-email'>Email: {email}</div>
        <div className='employee-phone'>Phone: {mobile}</div>
        </div>
        
        </div>
        
    </div>
  )
}

export default EmployeeCard