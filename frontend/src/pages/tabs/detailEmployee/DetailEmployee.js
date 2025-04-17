import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import projectContext from '../../../context/project/projectContext';
import Navigator from '../../../features/component/navigator/Navigator';
import "./_detailemployee.scss"

const DetailEmployee = () => {
    const location = useLocation();
    const {    
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
      salary} = location.state;

      const context = useContext(projectContext);
      const { getAttendance, attendances, getLeaves, leaves } = context;
      useEffect(() => {
        getLeaves()
        getAttendance()
        
      }, []);
      const user_att = attendances.filter(attendance => attendance.name === name);
      const total_leave = attendances.filter(attendance => attendance.name === name && attendance.attendance === 3);
      const totalWorkedHrsList = user_att.map(attendance => parseInt(attendance.worked_mins)/60);
      const totalWorkedHrs = totalWorkedHrsList.reduce((total, current) => total + parseInt(current), 0);

    if (user_att.length > 0){
    
    // avg start time 
    var startTimeHr = user_att.map(attendance => attendance.start_time.split(":"));
    var calculateAverage = (arr) => {
        var sum = arr.reduce((total, current) => total + parseInt(current), 0);
        return sum / arr.length;
    };

    var transposedDatastart = startTimeHr[0].map((_, colIndex) => startTimeHr.map(row => row[colIndex]));
    var averagesstart = transposedDatastart.map(column => calculateAverage(column));
    
    // avg leave time
    var leaveTimeHr = user_att.map(attendance => attendance.leave_time.split(":"));
    var transposedDataleave = leaveTimeHr[0].map((_, colIndex) => leaveTimeHr.map(row => row[colIndex]));
    var averagesleave = transposedDataleave.map(column => calculateAverage(column));
    var avgWorkedHrs = (totalWorkedHrsList.reduce((partialSum, a) => partialSum + a, 0)/totalWorkedHrsList.length).toFixed(2);

    // Function to calculate experience in years
    var calculateExperience = (doj) => {
      var today = new Date();
      var startDate = new Date(doj);
      var diffInMilliseconds = today - startDate;
      var millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
      var experienceInYears = diffInMilliseconds / millisecondsInYear;
      return Math.floor(experienceInYears);
    };

    // Average days in a month
    var calculateExperienceInMonths = (doj) => {
      var today = new Date();
      var startDate = new Date(doj);
      var diffInMilliseconds = today - startDate;
      var millisecondsInMonth = 1000 * 60 * 60 * 24 * 30.44; 
      var experienceInMonths = diffInMilliseconds / millisecondsInMonth;
      return Math.floor(experienceInMonths);
    };

    var experience = calculateExperience(doj);
    var experiencemonth = calculateExperienceInMonths(doj);
    }
    
  return (
    <div className='detailed-employee-page'>
             <Link to="/employees">
     <div className="d-flex flex-row tms-btn">
     <div className="tms-btn">
      <img src={`${require("./back.png")}`}/>
      </div>
     <h4 className="dashboard-title">Employee Details</h4></div></Link>
    <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1><hr/>
    {/* <table className='detailed-employee-info-table w-100 table table-dark table-striped'>

      <tr>
        <th className='p-3'>Name</th>
        <th className='p-3'>Role</th>
      </tr>
        <tr className='border-bottom'>
          <td className='p-3'>{name}</td>
          <td className='p-3'>{role}</td>
        </tr>
<tr>
        <th className='p-3'>Salary</th>
        <th className='p-3'>Email</th></tr>
        <tr className='border-bottom'>
          <td className='p-3'>{name}</td>
          <td className='p-3'>{role}</td>
        </tr>

        <tr>
        <th className='p-3'>Contact</th>
        <th className='p-3'>Date Of Birth</th></tr>
        <tr className='border-bottom'>
          <td className='p-3'>{name}</td>
          <td className='p-3'>{role}</td>
        </tr>


        <tr>
        <th className='p-3'>Date Of Joining</th>
        <th className='p-3'>Date Of Anniversary</th>
        </tr>
        <tr className='border-bottom'>
          <td className='p-3'>{name}</td>
          <td className='p-3'>{role}</td>
        </tr>

        <tr>
        <th className='p-3'>Gender</th>
        <th className='p-3'>Address</th>
        </tr>
        <tr className='border-bottom'>
          <td className='p-3'>{name}</td>
          <td className='p-3'>{role}</td>
        </tr>

        <tr>
        <th className='p-3'>City</th>
        <th className='p-3'>Pincode</th>
        </tr>    
        <tr className='border-bottom'>
          <td className='p-3'>{name}</td>
          <td className='p-3'>{role}</td>
        </tr>  
    </table> */}
    <div className="d-flex flex-column  detailed-employee-info-table pb-5">
    <h3>Personal Info</h3><hr/>
    <div className="d-flex flex-row">
      <div className="detailed-employee-page detailed-employee-page-aame">Name: {name}</div>
      <div className="detailed-employee-page detailed-employee-page-dob">Date of birth: {dob.split("-").reverse().join("-")}</div>
      <div className="detailed-employee-page detailed-employee-page-aame">Address: {address}</div>
    </div>
    <div className="d-flex flex-row">
    <div className="detailed-employee-page detailed-employee-page-name">Role: {role}</div>
      <div className="detailed-employee-page detailed-employee-page-dob">Date of aniversary: {ad ?(ad):(<>Still Single</>)}</div>
      <div className="detailed-employee-page detailed-employee-page-dob">City: {city}</div>
    </div>
    <div className="d-flex flex-row">
    <div className="detailed-employee-page detailed-employee-page-aame">Salary: {salary}</div>
      <div className="detailed-employee-page detailed-employee-page-dob">Date of Joining: {doj}</div>
      <div className="detailed-employee-page detailed-employee-page-dob">Pincode: {pincode}</div>
    </div>
    <div className="d-flex flex-row">
    <div className="detailed-employee-page detailed-employee-page-dob">Mobile: {mobile}</div>  
    <div className="detailed-employee-page detailed-employee-page-aame">Email: {email}</div>
    <div className="detailed-employee-page detailed-employee-page-dob">Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}</div>  
    </div>
    </div><br/>
    <div className="d-flex flex-column  detailed-employee-info-table pb-5">
    <h3>Attendance Info</h3><hr/>
    {user_att.length > 0 ? (
    <>
    <div className="d-flex flex-row">
      <div className="detailed-employee-page detailed-employee-page-avg-work-hrs">Avg Work Hrs: {avgWorkedHrs}</div>
      <div className="detailed-employee-page detailed-employee-page-avg-entry-time">Avg Entry Time: {String(Math.floor(averagesstart[0]))}:{ String(Math.floor(averagesstart[1])).padStart(2, '0')} </div>
      <div className="detailed-employee-page detailed-employee-page-aame">Worked For: {experience > 0 ?(<>{experience} Years</>): (<>{experiencemonth} Months</>)}</div>
    </div>
    <div className="d-flex flex-row">
    <div className="detailed-employee-page detailed-employee-page-leave-time">Total Leaves: {total_leave.length}</div>
    <div className="detailed-employee-page detailed-employee-page-leave-time">Avg Leave Time: {String(Math.floor(averagesleave[0]))}:{ String(Math.floor(averagesleave[1])).padStart(2, '0')} </div>
      <div className="detailed-employee-page detailed-employee-page-dob">City: {city}</div>
    </div></>) : (<h6>Nothing to preview</h6>)}
    </div>
    <Navigator  />
    </div>
  )
}

export default DetailEmployee


