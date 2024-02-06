import React, { useState, useContext, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import projectContext from '../../../context/project/projectContext';
import Card from "../../../features/component/card/Card"
import RequestLeave from '../../../widgets/forms/reuestleave/RequestLeave';
import swal from 'sweetalert';
import LeaveRequest from '../../../features/component/leaverequest/LeaveRequest';
import { Colors } from 'chart.js';
import Navigator from "../../../features/component/navigator/Navigator"
import "./_attendance.scss"

Chart.register(Colors);


const Attendance = () => {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [userWithinLocation, setUserWithinLocation] = useState(null);
  const [attendance, setAttendance] = useState(0);
  const context = useContext(projectContext);
  const { markDailyAttendance, getAttendance, attendances, updateDailyAttendance, getLeaves, leaves } = context;
  const code = localStorage.getItem("code");
  const attendance_check = localStorage.getItem("attendance");
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });
  useEffect(() => {
    if (coords) {
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }

    getAttendance()
    getLeaves()
    
  }, [coords, attendances]);
//console.log("loc",userLocation.latitude, userLocation.longitude)
  useEffect(() => {
    getLeaves()
    getAttendance()
    
  }, []);
  
  const isWithinDistance = (targetLocation, distance) => {
    if (!userLocation.latitude || !userLocation.longitude) {
      console.error('User location not available');
      return false;
    }

    const earthRadius = 6371000; // Earth radius in meters

    const lat1 = toRadians(userLocation.latitude);
    const lon1 = toRadians(userLocation.longitude);
    const lat2 = toRadians(targetLocation.targetLatitude);
    const lon2 = toRadians(targetLocation.targetLongitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInMeters = earthRadius * c;
    return distanceInMeters <= distance;
  };
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const handleAttendance = async () => {
    try {
      const targetLocation = {
        targetLatitude: 18.9498,
        targetLongitude: 72.8277,
      };

      const distanceThreshold = 2000;
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const start_time = `${hour}:${minute}`;
      const leave_time = `${hour}:${minute}`;

      if (isWithinDistance(targetLocation, distanceThreshold)) {
        setAttendance(1)
        const reason = '';
        await markDailyAttendance(reason, start_time, leave_time, date.toString(), userLocation.latitude,  userLocation.longitude);
        await getAttendance()
      } else {
        swal({
        title: "Try Again",
        text: "Cannot mark your location, As your not located within 100m from the office!!",
        icon: "error",
        dangerMode: true
      })
      }
    } catch (error) {
      console.error('Error in handleAttendance:', error.message);
    }
  };

  let users;
  users = Array.from(new Set(attendances.map(attendance => attendance.name)));

  const today = new Date();
  if(code == "2562"){
    var date_len = (attendances.length /users.length);
  }else{
    var date_len = attendances.length;
  }
  const uniqueDatesSet = new Set(attendances.map(attendance => attendance.date));

  // Convert the Set to an array
  const uniqueDatesArray = Array.from(uniqueDatesSet);
  
  const total_worked_hrs = users.map((user, index) => {
    const userAttendances = attendances.filter(attendance => attendance.name === user);
    const workedMinsData = userAttendances.map(attendance => parseInt(attendance.worked_mins) / 60);
    const total_hrs = workedMinsData.reduce((acc, hr) => acc + hr, 0);
  
    return { user, total_hrs };
  });
  
  const data = {
    labels: uniqueDatesArray, 
    datasets: users.map((user, index) => {
      const userAttendances = attendances.filter(attendance => attendance.name === user);
      const workedMinsData = userAttendances.map(attendance => parseInt(attendance.worked_mins)/60);
      return {
        label: user,
        data: workedMinsData,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 8,
      };
    }),
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Progress`,
        color: 'white',
        position: 'bottom',
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          color: 'white',
        },
      },
      colors: {
        enabled: true,
        forceOverride: true
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255,255,255,0.2)',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255,255,255,0.2)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
    layout: {
      padding: 20,
    }
  };

    const attendance_record = attendances.filter((attendance) => {
      return (
        attendance.attendance !== 0 
      );
    });

    
    const total_attendance = attendance_record.length;
    const total_leaves = attendances.length - total_attendance;

 
    const handleLeaveMark = async () => {
      await getAttendance()
      console.log(attendances,attendances[attendances.length-1].date)
      var attendance_date = attendances[attendances.length-1].date
      
      var toUTC = new Date(attendance_date)
      var today = new Date();
      var today_dd = String(today.getDate()).padStart(2, '0');
      var today_mm = String(today.getMonth() + 1).padStart(2, '0');
      var today_yyyy = today.getFullYear();
      var today_hrs = String(today.getHours()).padStart(2, '0');
      var today_mins = String(today.getMinutes()).padStart(2, '0');
      const leave_time = `${today_hrs}:${today_mins}`;
      var attendance_dd = String(toUTC.getDate()).padStart(2, '0');
      var attendance_mm = String(toUTC.getMonth() + 1).padStart(2, '0');
      var attendance_yyyy = toUTC.getFullYear();
      if (today_dd == attendance_dd && today_mm === attendance_mm && today_yyyy === attendance_yyyy){
        await setAttendance(2)
        await updateDailyAttendance(attendances[attendances.length-1]._id, leave_time)
        
      }
    }


    
    let todays_attendance = attendances[attendances.length-1]
    if(String(todays_attendance) == "undefined" || todays_attendance.attendance < 2){
      var check = "show"
    }else{
      var check = "donot"
    }

    
    


  return (
    <div className='attendance-dashboard'>
    
    <div>
    <h1>Attendance</h1><hr/><br/>
    {check == "show" ?
    (<>
    {attendance < 2 || attendance == 0 ? ( 
    <div class="attendance-group" role="group" aria-label="Basic example">
    {attendance < 1  || (todays_attendance == "undefined"  )  ? 
       ( <button className='btn btn-primary btn-lg mark-attendance'  onClick={handleAttendance}>Mark Entry</button>):

      (<button className='btn btn-primary btn-lg mark-attendance'  onClick={handleLeaveMark}>Mark Leave</button>)} 
        </div> ): null} </>):<h2>Todays Entries are Marked</h2>}
    </div><br/><br/>

    {total_worked_hrs.length > 0 && code != "2562" ?(
      <>
    <div className="d-flex flex-row task-section  justify-content-around align-items-center pt-3">
         <Card
           img={require(`./google.png`)}
           header="Attendance"
           value={total_attendance}
           width={"30%"}
         />
         <Card
           img={require(`./leave.png`)}
           header="Leave"
           value={total_leaves}
           width={"30%"}
         />
                  <Card
           img={require(`../../../res/image/ongoing.png`)}
           header="Total wroked Hrs"
           value={`${total_worked_hrs[0].total_hrs.toFixed()} Hrs`}
           width={"30%"}
         />
       </div><br/><br/></>):null}
      <div>
      <h1>Weekly Attendance Report</h1>
      <Line data={data} options={options} />
    </div>   
    <div><RequestLeave/>
    </div><br/>
    {code =="2562" ? (
    <div>
      <h1>Request Request</h1><hr/><br/>
      {leaves && leaves.map((leave, i) => (
        <>
      {leave.status == "under approval" ? (
      <LeaveRequest leave={leave} i={i} id={leave._id} />     ):null} </>
      ))}

    </div>) : (    
    <div>
      <h1>Request Status</h1><hr/><br/>
      {leaves && leaves.map((leave, i) => (
      <LeaveRequest leave={leave} i={i} id={leave._id} />
      ))}
    </div>
    )}

    <Navigator  />
    
    </div>

   
  );
};

export default Attendance;








// 0-not marked yet | 1-entry mark | 2-departure mark | 3-leave











