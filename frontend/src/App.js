import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfoForm from "./components/UserInfoForm";
import HomePage from "./components/HomePage";
import SleepPage from "./components/SleepPage";
import Sleeping from "./components/Sleeping";
import SleepReport from "./components/SleepReport";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* User Info Form */}
        <Route path="/" element={<UserInfoForm />} />

        {/* Home Page */}
        <Route path="/HomePage" element={<HomePage />} />
        
        {/* Sleep Page */}
        <Route path="/SleepPage" element={<SleepPage />} />

        {/* Sleeping */}
        <Route path="/Sleeping" element={<Sleeping />} />

        {/* Sleep Report */}
        <Route path="/SleepReport" element={<SleepReport />} />


      </Routes>
    </Router>
  );
};

export default App;
