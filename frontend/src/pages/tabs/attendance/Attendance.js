import React, { useState, useContext, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import projectContext from '../../../context/project/projectContext';
import Card from "../../../features/component/card/Card"
import swal from 'sweetalert';
import { Colors } from 'chart.js';
import "./_attendance.scss"

Chart.register(Colors);


const Attendance = () => {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [userWithinLocation, setUserWithinLocation] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [entry, setEntry] = useState(false);
  const context = useContext(projectContext);
  const { markDailyAttendance, getAttendance, attendances } = context;
  let entries = 0;
  const code = localStorage.getItem("code");
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
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
  }, [coords]);

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
      setAttendance('true');

      const targetLocation = {
        targetLatitude: 18.9498,
        targetLongitude: 72.8277,
      };

      const distanceThreshold = 1400;

      if (isWithinDistance(targetLocation, distanceThreshold)) {
        setUserWithinLocation(true);
      } else {
        setUserWithinLocation(false);
      }
console.log(targetLocation, userLocation.latitude, userLocation.longitude)

      if (userWithinLocation){
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const start_time = `${hour}:${minute}`;
      const leave_time = `${hour}:${minute}`;
      const reason = 'blueberry';
      await markDailyAttendance(attendance, reason, start_time, leave_time, date.toString(), userLocation.latitude,  userLocation.longitude);}
      else{
        swal({
  title: "Are you sure?",
  text: "Kindly pls try after reaching office",
  icon: "warning",
  dangerMode: true,
})
      }



    } catch (error) {
      console.error('Error in handleAttendance:', error.message);
    }
  };

  const handleEntry =()=>{
    if(entry == false){
    setEntry(true)}else{
    setEntry(false)}
  }

  const today = new Date();
  const last30Days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() - index);
    return date.toDateString().slice(4, 10);
  });
  const users = Array.from(new Set(attendances.map(attendance => attendance.name)));
  

  const total_worked_hrs = users.map((user, index) => {
    const userAttendances = attendances.filter(attendance => attendance.name === user);
    const workedMinsData = userAttendances.map(attendance => parseInt(attendance.worked_mins) / 60);
  
    // Calculate the total hours for the user
    const total_hrs = workedMinsData.reduce((acc, hr) => acc + hr, 0);
  
    return { user, total_hrs }; // Return both user and total hours in the result object
  });

 

  
  // Create the 'data' object for chart.js
  const data = {
    labels: last30Days, // Assuming 'last30Days' is defined
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
    },
 
  };


  


    const attendance_record = attendances.filter((attendance) => {
      return (
        attendance.attendance === "true" 
      );
    });


    const total_attendance = attendance_record.length;
    const total_leaves = attendances.length - total_attendance;

    

  return (
    <div className='attendance-dashboard'>
    <div>
    <h1>Attendance</h1><hr/><br/>
    {entries !== 2 ?(
    <div class="attendance-group" role="group" aria-label="Basic example">
    {!entry ?
      (<button className='btn btn-primary btn-lg mark-attendance'  onClick={handleAttendance}>Mark Entry</button>):
      (<button className='btn btn-primary btn-lg mark-attendance'  onClick={handleAttendance}>Mark Leave</button>)}
        </div>): null}
    </div><br/><br/>

    {total_worked_hrs.length > 0 && code != "2562" ?(

      <>
    <div className="d-flex flex-row task-section  justify-content-around align-items-center pt-3">
         <Card
           img={require(`../../../res/image/ongoing.png`)}
           header="Attendance"
           value={total_attendance}
           width={"30%"}
         />
         <Card
           img={require(`../../../res/image/under.png`)}
           header="Leaves"
           value={total_leaves}
           width={"30%"}
         />
                  <Card
           img={require(`../../../res/image/under.png`)}
           header="Total wroked Hrs"
           value={`${total_worked_hrs[0].total_hrs.toFixed()} Hrs`}
           width={"30%"}
         />
       </div><br/><br/></>):null}
   



      <div>
      <h1>Hours per Day - Last {(attendances.length / users.length)} Days</h1>
      <Line data={data} options={options} />
    </div>
    </div>

   
  );
};

export default Attendance;



















