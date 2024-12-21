import React, { useState } from "react";

const UserInfoForm = () => {
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
    console.log("Form Data Submitted:", formData);
    // You can send this data to your backend using an API call here
  };

  return (
    <div className="user-info-form">
      <h1>Welcome to Sleepzzz</h1>
      <p>Please fill out the following information to get started:</p>
      <form onSubmit={handleSubmit}>
        {/* Name */}
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

        {/* Gender */}
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

        {/* Occupation */}
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

        {/* Physical Activity */}
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

        {/* BMI Category */}
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

        {/* Stress Level */}
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

        {/* Blood Pressure */}
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

        {/* Heart Rate */}
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

        {/* Daily Steps */}
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
  );
};

export default UserInfoForm;
