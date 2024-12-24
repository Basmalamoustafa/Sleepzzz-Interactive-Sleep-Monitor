import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import routing components

import UserInfoForm from "./components/UserInfoForm";
import "./App.css";
import SleepReport from "./components/SleepReport";
import AccelerometerSensor from './components/AccelerometerSensor';
import MicrophoneCapture from "./components/MicrophoneCapture";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar />
    <Routes>
  <Route path="/" element={<SleepReport />} /> {/* Default route now points to SleepReport */}
  <Route path="/sleep-report" element={<SleepReport />} /> {/* Sleep report page */}
  <Route path="/accelerometer" element={<AccelerometerSensor />} /> {/* Accelerometer page */}
  <Route path="/user-info" element={<UserInfoForm />} /> {/* User info page */}
</Routes>

    </div>
    </Router>
  );
}

export default App;
