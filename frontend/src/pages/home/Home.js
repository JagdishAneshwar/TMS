import React, { useContext, useState, useEffect } from "react";
import "./_home.scss";
import projectContext from '../../context/project/projectContext';
import Dashboard from "../tabs/dashboard/Dashboard";
import Projects from "../tabs/projects/Projects";
import Employee from "../tabs/employee/Employee";
import Attendance from "../tabs/attendance/Attendance";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const context = useContext(projectContext);
  const { getLeaves, leaves, updateLeave } = context;
  const handleLogOut = () => {
    localStorage.removeItem("token");
    history("/login");
  };
 
  const [notificationClicked, setNotificationClicked] = useState(false);
  let history = useNavigate();
  const code = localStorage.getItem("code");

  const notificationCount = code === "2562"
  ? leaves.filter(leave => leave.adminsaw === "false")
  : leaves.filter(leave => leave.usersaw === "false");

  const getleaveCall= async()=>{
    await getLeaves()
  }
  useEffect(() => {
    const notificationClickedStored = localStorage.getItem("notificationClicked");
    if (notificationClickedStored) {
      setNotificationClicked(true);
    }
    getleaveCall()
  }, []); 

  const handleNotificationClick = async() => {
    setNotificationClicked(true);
    localStorage.setItem("notificationClicked", "true");
    const leavesToUpdate = leaves.filter(leave => leave.adminsaw === "false").map(leave => leave._id);
    updateLeave(leavesToUpdate)
  };

  const pillWidth = code === "2562" ? '20%' : '25%';
  const pillStyle = {
    width: pillWidth,
  };

  return (
    <section className="home">
      <nav className="navbar container navbar-expand-md fixed-bottom">
          <ul className="nav navbar-nav ml-auto d-flex align-items-center justify-content-around">
          <li className="login-btn" data-toggle="collapse" data-target=".navbar-collapse.show" >
                <img src={require("./profile.png")} onClick={handleLogOut} />
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={pillStyle}>
              <a className="nav-link" href="project" id="v-pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#v-pills-dashboard" type="button" role="tab" aria-controls="v-pills-dashboard" aria-selected="true">
                Home
              </a>
            </li>
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={pillStyle}>
              <a className="nav-link" href="#link2"  id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                Tasks
              </a>
            </li>
            {code === "2562" ? (
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={pillStyle}>
              <a className="nav-link" href="#link2" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                Employees
              </a>
            </li>):null}
          
            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={pillStyle}>
              <a className="nav-link position-relative" href="#link2" id="v-pills-attendance-tab" data-bs-toggle="pill"  onClick={handleNotificationClick} data-bs-target="#v-pills-attendance" type="button" role="tab" aria-controls="v-pills-attendance" aria-selected="false">
                Attendance{notificationCount.length > 0 ? (
                  <span className="badge bg-danger ms-3 fs-6 translate-middle rounded-pill" onClick={handleNotificationClick}>{notificationCount.length}</span>):null}
              </a>
            </li>
            <li className="logout-btn" data-toggle="collapse" data-target=".navbar-collapse.show">
                <img src={require("./logout.png")} onClick={handleLogOut} />
            </li>
          </ul>
      </nav>
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active" id="v-pills-dashboard" role="tabpanel" aria-labelledby="v-pills-dashboard-tab">
          <Dashboard/>
        </div>
        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
          <Projects/>
        </div>
        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
          <Employee/>
        </div>
        <div class="tab-pane fade" id="v-pills-attendance" role="tabpanel" aria-labelledby="v-pills-messages-tab">
          <Attendance/>
        </div>
        </div>
    </section>
  );
};
export default Home;
