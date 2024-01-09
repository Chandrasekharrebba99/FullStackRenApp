
import React, { useState } from 'react';

import './index.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const userID = localStorage.getItem('user_id');
    const explore = `/explore/${userID}`
    const profile = `/profile/${userID}`
    const orderstab = `/orders/${userID}`
    const createproperty = `/createproperty/${userID}`
    const myproperties = `/myproperties/${userID}`

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>
    </button>
    <div className="logo-container">
        {/* <img
          src="https://pics.freeicons.io/uploads/icons/png/11469623821639569239-512.png"
          alt="ZealCrafters Logo"
          className="logo"
        /> */}
        <img className="companypng" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKg8elVv6hSqTvrsLRMIkXWtEXxE-pu86pCA&usqp=CAU" />
        <span className="brand-name">Moonhive</span>
      </div>

    <ul>
      <Link to={explore}>
       <li>Home</li>
      </Link>
      <Link to={profile}>
       <li>Profile</li>
      </Link>
     
      <Link to={orderstab}>
        <li>Tenant Orders</li>
      </Link>
      <Link to={createproperty}>
      <li>Create Property</li>
      </Link>
      <Link to={myproperties}>
        <li>My properties</li>
      </Link>
     
     
      <li>Blogs</li>
    </ul>
  </div>
  );
}

export default Navbar;
