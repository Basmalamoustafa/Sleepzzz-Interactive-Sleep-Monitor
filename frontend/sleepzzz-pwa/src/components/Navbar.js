import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active link styling
import './Navbar.css';

function Navbar() {
    console.log("Navbar is rendered");
  return (
    <nav>
        <div>Test Navbar Visible</div>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Microphone Capture
          </NavLink>
        </li>
        <li>
          <NavLink to="/sleep-report" className={({ isActive }) => (isActive ? 'active' : '')}>
            Sleep Report
          </NavLink>
        </li>
        <li>
          <NavLink to="/accelerometer" className={({ isActive }) => (isActive ? 'active' : '')}>
            Accelerometer Sensor
          </NavLink>
        </li>
        <li>
          <NavLink to="/user-info" className={({ isActive }) => (isActive ? 'active' : '')}>
            User Info
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
