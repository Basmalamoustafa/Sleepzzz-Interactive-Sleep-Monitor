import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAudio } from "./AudioContext";
import "./Sleeping.css";
import MicrophoneSensor from "./MicrophoneSensor";

const Sleeping = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [endTime, setEndTime] = useState(null);


    
  const { setAudioData } = useAudio();  
  const [isRecording, setIsRecording] = useState(false);
   

  useEffect(() => {
    const updatePointerPosition = ({ x: mouseX, y: mouseY }) => { 
      const coordX = mouseX.toFixed(2);
      const coordY = mouseY.toFixed(2);
      document.documentElement.style.setProperty('--mouse-x', coordX);
      document.documentElement.style.setProperty('--mouse-y', coordY);
    }
    document.body.addEventListener('pointermove', updatePointerPosition);

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      document.body.removeEventListener("pointermove", updatePointerPosition);
      clearInterval(interval);
    };
  }, []);

  const handleWakeUpClick = (e) => {
    e.preventDefault();
    const EndTime = new Date().toLocaleTimeString(); 
  
    setEndTime(EndTime);
  
    fetch("https://56e3-82-129-198-66.ngrok-free.app/add-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ EndTime }) 
    })
    .then((response) => {
      if (response.ok) {
        console.log("Data added successfully");
        navigate('/HomePage');
      } else {
        console.error("Failed to save data");
        alert("Something went wrong. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });  
  };


  const handleRecording = async () => {
    if (isRecording) {
      
      setIsRecording(false); 
    } else {
      
      setIsRecording(true); 
    }
  };


  return (
    <div className="sleeping_page">
    <div className="container">
      <div className="clock">
        <span>{time}</span>
      </div>
      
      {endTime && (
        <div className="end-time">
          <p>End time: {endTime}</p> 
        </div>
      )}
      <div className="on-ground-lights">
        <div className="window-light">
          <div className="cat">
            <div className="head"></div>
          </div>
        </div>
        <div className="window-light"></div>
      </div>
      <div className="table right">
        <div className="table-shadow">
          <div className="window-light"></div>
        </div>
      </div>
      <div className="bed">
        <div className="bed-shadow">
          <div className="window-light"></div>
          <div className="window-light"></div>
        </div>
        <div className="bed-head"></div>
        <div className="ground-cloth">
          <div className="window-light"></div>
          <div className="window-light"></div>
          <div className="under-pillow-shadows">
            <div className="head-shadow"></div>
            <div className="neck-shadow"></div>
          </div>
          <div className="pillow">
            <div className="window-light"></div>
            <div className="pillow-shadows">
              <div className="ear-shadow"></div>
              <div className="head-shadow"></div>
            </div>
          </div>
          <div className="boy">
            <div className="shoulder"></div>
            <div className="neck"></div>
            <div className="ears"></div>
            <div className="head">
              <div className="nose"></div>
              <div className="eyebrows">
                <div className="eyebrow"></div>
                <div className="eyebrow"></div>
              </div>
              <div className="eyes"></div>
              <div className="mouth"></div>
            </div>
            <div className="hair">
              <div className="part"></div>
              <div className="part keen"></div>
              <div className="part keen"></div>
              <div className="part keen"></div>
              <div className="part keen"></div>
              <div className="part keen"></div>
              <div className="part"></div>
              <div className="part"></div>
            </div>
          </div>
        </div>
        <div className="quilt">
          <div className="top">
            <div className="window-light"></div>
            <div className="window-light"></div>
            <div className="window-light"></div>
            <div className="window-light"></div>
          </div>
          <div className="bottom">
            <div className="window-light"></div>
            <div className="window-light"></div>
          </div>
        </div>
      </div>
      <div className="shoes">
        <div className="shoe"></div>
        <div className="shoe"></div>
      </div>
      <div className="table left">
        <div className="lamp">
          <div className="bulb"></div>
        </div>
        <div className="phone"></div>
      </div>
    </div>
  <button onClick={handleWakeUpClick}>
    <span>Wake-up ☀️</span>
  </button>

  <div className="recording-button">
    <button onClick={handleRecording}>
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </button>
</div>
      <MicrophoneSensor isRecording={isRecording} setAudioData={setAudioData} />    </div>

    
  );
};

export default Sleeping;
