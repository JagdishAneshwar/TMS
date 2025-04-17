import React from 'react'
import "./_nav.scss";
import Navbtn from "../../component/nav-button/NavButton";
import Profile from "../../component/circular-profile/Profile";

const Nav = () => {
  return (
    <>
    
    <div
    className="nav flex-column nav-pills me-3"
    id="v-pills-tab"
    role="tablist"
    aria-orientation="vertical"
  >
    <Profile/>
    <Navbtn
      value="home"
      className="nav-link active"
      id="v-pills-home-tab"
      data-bs-toggle="pill"
      data-bs-target="#home"
      type="button"
      role="tab"
      aria-controls="home"
      aria-selected="true"
    />
    <Navbtn
      value="projects"
      className="nav-link"
      id="v-pills-projects-tab" 
      data-bs-toggle="pill"
      data-bs-target="#projects"
      type="button"
      role="tab"
      aria-controls="projects"
      aria-selected="false"
    />
    <Navbtn
      value="employee"
      className="nav-link"
      data-bs-toggle="pill"
      data-bs-target="#employee"
      type="button"
      role="tab"
      aria-controls="employee"
      aria-selected="false"
    />
    <Navbtn
      value="tasks"
      className="nav-link"
      data-bs-toggle="pill"
      data-bs-target="#tasks"
      type="button"
      role="tab"
      aria-controls="tasks"
      aria-selected="false"
    />
  </div>
  </>
  )
}

export default Nav