import React from 'react'
import "./_employeecard.scss";

const EmployeeCard = ({name, img, role, age, gender, email, phone, salary}) => {
  return (
    <div className='employee-info-card d-flex flex-row'>
        <img className='employee-img' src={img} alt="card-logo" />
        <div className='info-wrapper d-flex flex-row '>
        <div className='employee-name-role'>
        <h6>info</h6>
        <div className='employee-name'>Name: {name}</div>
        <div className='employee-role'>Role: {role}</div>
        </div>
        <div className='age-gender'>
        <h6>Salary</h6>
        <div className='employee-age'>Salary: {salary}</div>
        <div className='employee-gender'>Role: {role}</div>
        </div>
        <div className='contact'>
        <h6>Contact</h6>
        <div className='employee-email'>Email: {email}</div>
        <div className='employee-phone'>Phone: {phone}</div>
        </div>
        
        </div>
        
    </div>
  )
}

export default EmployeeCard