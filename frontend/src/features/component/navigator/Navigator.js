import React, { useContext, useState, useEffect } from "react";
import projectContext from '../../../context/project/projectContext';
import { Link, useNavigate } from "react-router-dom";
import "./_navigator.scss"

const Navigator = () => {
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
    await getLeaves();
  }
  useEffect(() => {
    const notificationClickedStored = localStorage.getItem("notificationClicked");
    if (notificationClickedStored) {
      setNotificationClicked(true);
    }
    getleaveCall();
  }, []); 

  const handleNotificationClick = async() => {
    setNotificationClicked(true);
    localStorage.setItem("notificationClicked", "true");
    const leavesToUpdate = leaves.filter(leave => leave.adminsaw === "false").map(leave => leave._id);
    updateLeave(leavesToUpdate);
  };

  const pillWidth = code === "2562" ? '20%' : '25%';
  const pillStyle = {
    width: pillWidth,
  };
  return (
    <nav className="navbar container navbar-expand-md fixed-bottom">
      <ul className="nav navbar-nav ml-auto d-flex align-items-center justify-content-around">
        <li className="login-btn" data-toggle="collapse" data-target=".navbar-collapse.show">
          <img src={require("./profile.png")} onClick={handleLogOut} alt="Logout" />
        </li>
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={pillStyle}>
          <Link className="nav-link" to="/dashboard">
            Home
          </Link>
        </li>
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={pillStyle}>
          <Link className="nav-link" to="/tasks">
            Tasks
          </Link>
        </li>
        {code === "2562" ? (
          <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={pillStyle}>
            <Link className="nav-link" to="/employees">
              Employees
            </Link>
          </li>
        ) : null}
        <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={pillStyle}>
          <Link className="nav-link position-relative" to="/attendances">
            Attendance
            {notificationCount.length > 0 ? (
              <span className="badge bg-danger ms-3 fs-6 translate-middle rounded-pill" onClick={handleNotificationClick}>
                {notificationCount.length}
              </span>
            ) : null}
          </Link>
        </li>
        <li className="logout-btn" data-toggle="collapse" data-target=".navbar-collapse.show">
          <img src={require("./logout.png")} onClick={handleLogOut} alt="Logout" />
        </li>
      </ul>
    </nav>
  );
};

export default Navigator;
