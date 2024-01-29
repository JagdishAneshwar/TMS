import React from 'react'
import "./_profile.scss";

const Profile = () => {
  return (

    <div className='profile-layout'>
        <div className="circular-layout">
            <img className='profile-pic rounded-circle' src={require("../../../res/image/img1.jpg")} alt="profile"/>
        </div>
    </div>

  )
}

export default Profile