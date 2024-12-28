import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./UserInfoForm.css";

const updatePointerPosition = ({ x: mouseX, y: mouseY }) => { 
    const coordX = mouseX.toFixed(2);
    const coordY = mouseY.toFixed(2);
    document.documentElement.style.setProperty('--mouse-x', coordX);
    document.documentElement.style.setProperty('--mouse-y', coordY);
}
document.body.addEventListener('pointermove', updatePointerPosition);  

const UserInfoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    occupation: "",
    physicalActivity: "",
    bmiCategory: "",
    stressLevel: "",
    bloodPressure: "",
    heartRate: "",
    dailySteps: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      fetch("http://127.0.0.1:5000/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
    .then((response) => {
      if (response.ok) {
        console.log("Data saved successfully");
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

  return (
    <div className="form-page">
      <div className="user-info-form">
        <h1>Welcome to Sleepzzz!</h1>
        <p>Please fill out the following information to get started:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label>
            Occupation:
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Physical Activity:
            <select
              name="physicalActivity"
              value={formData.physicalActivity}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="sedentary">Sedentary</option>
              <option value="lightly active">Lightly Active</option>
              <option value="moderately active">Moderately Active</option>
              <option value="very active">Very Active</option>
            </select>
          </label>

          <label>
            BMI Category:
            <select
              name="bmiCategory"
              value={formData.bmiCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="underweight">Underweight</option>
              <option value="normal weight">Normal Weight</option>
              <option value="overweight">Overweight</option>
              <option value="obese">Obese</option>
            </select>
          </label>

          <label>
            Stress Level:
            <select
              name="stressLevel"
              value={formData.stressLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select...</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <label>
            Blood Pressure:
            <input
              type="text"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              placeholder="e.g., 120/80"
              required
            />
          </label>

          <label>
            Heart Rate (bpm):
            <input
              type="number"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Daily Steps:
            <input
              type="number"
              name="dailySteps"
              value={formData.dailySteps}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
