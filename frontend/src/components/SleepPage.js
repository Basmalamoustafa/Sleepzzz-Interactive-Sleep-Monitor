import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./SleepPage.scss";

const SleepPage = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  const handleStartClick = (e) => {
    e.preventDefault();
    const startTime = new Date().toLocaleTimeString(); 
  
    setStartTime(startTime);
  
    fetch("http://127.0.0.1:5000/add-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startTime }) 
    })
    .then((response) => {
      if (response.ok) {
        console.log("Data added successfully");
        navigate('/Sleeping');
      } else {
        console.error("Failed to save data");
        alert("Something went wrong. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });  
  };

  return (
    <div className="sleep-page">
      <div className="clock">{time}</div>
      <div className="sleeping">
        <span>z</span>
        <span>z</span>
        <span>z</span>
      </div>
      <button onClick={handleStartClick}>
        <span>Start Sleeping 🌙</span>
      </button>
      {startTime && (
        <div className="start-time">
          <p>Sleep started at: {startTime}</p>
        </div>
      )}
    </div>
  );
};

export default SleepPage;
