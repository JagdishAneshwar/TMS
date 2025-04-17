import React from 'react'
import "./_navbtn.scss";

const NavBtn = ({value, link}) => {
  return (
    <button className="navbtn">{value}</button>
  )
}

export default NavBtn