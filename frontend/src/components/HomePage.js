import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const updatePointerPosition = ({ x: mouseX, y: mouseY }) => {
      const coordX = mouseX.toFixed(2);
      const coordY = mouseY.toFixed(2);
      document.documentElement.style.setProperty("--mouse-x", coordX);
      document.documentElement.style.setProperty("--mouse-y", coordY);
    };

    document.body.addEventListener("pointermove", updatePointerPosition);

    return () => {
      document.body.removeEventListener("pointermove", updatePointerPosition);
    };
  }, []);

  const handleSleepClick = () => {
    navigate("/SleepPage"); 
  };
  const handleAnalisysClick = () => {
    navigate("/SleepReport"); 
  };

  return (
    <div className="home-page">
      <div className="buttons">
        <button onClick={handleSleepClick}>
          <span>Sleep 🌙</span>
        </button>
        <button onClick={handleAnalisysClick}>
          <span>Analisys 🔎</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
