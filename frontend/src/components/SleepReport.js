import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './SleepReport.css';
import MicrophoneSensor from "./MicrophoneSensor";
import Sleeping from "./Sleeping";
import { useAudio } from "./AudioContext";

function SleepReport() {
    const {audioData} = useAudio();
  const [reportData, setReportData] = useState({
    sleepScore: 85,
    deepSleepData: [30, 40, 50, 60, 50, 40, 30],
    awakeData: [10, 15, 20, 25, 20, 15, 10],
    sleepTime: "10:00 PM",
    wakeUpTime: "6:00 AM",
    duration: "8 hrs",
    
  });

  const { sleepScore, deepSleepData, awakeData, sleepTime, wakeUpTime, duration, snoreCount } = reportData;

  

  const [isRecording, setIsRecording] = useState(false); 



 const [satisfaction, setSatisfaction] = useState(""); 
 const handleSatisfactionChange = (event) => {
  setSatisfaction(event.target.value);
 };

 
//simulated data
  const data = [
    { time: "12 AM", deepSleep: deepSleepData[0], awake: awakeData[0] },
    { time: "1 AM", deepSleep: deepSleepData[1], awake: awakeData[1] },
    { time: "2 AM", deepSleep: deepSleepData[2], awake: awakeData[2] },
    { time: "3 AM", deepSleep: deepSleepData[3], awake: awakeData[3] },
    { time: "4 AM", deepSleep: deepSleepData[4], awake: awakeData[4] },
    { time: "5 AM", deepSleep: deepSleepData[5], awake: awakeData[5] },
    { time: "6 AM", deepSleep: deepSleepData[6], awake: awakeData[6] },
  ];




 
 

  return (
    <div className="sleep-report">
      <header className="report-header">
        <h1>Sleep Report</h1>
        <h5>Quality report of your sleep</h5>
      </header>

      <div className="sleep-score">
        <h2>Sleep Score: {sleepScore}</h2>
        <div className="stars">{"\u2605".repeat(Math.round(sleepScore / 20))}</div>
      </div>

      <div className="sleep-card">
        <div className="sleep-graph">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="deepSleep" stroke="#1f09e4d4" fill="#1f09e4d4" />
              <Line type="monotone" dataKey="awake" stroke="#11a1e3ec" fill="#11a1e3ec" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="sleep-stats">
          <div className="stat-card">
            <h3>Sleep Time</h3>
            <p>{sleepTime}</p>
          </div>
          <div className="stat-card">
            <h3>Wake-Up Time</h3>
            <p>{wakeUpTime}</p>
          </div>
          <div className="stat-card">
            <h3>Duration</h3>
            <p>{duration}</p>
          </div>
          <div className="stat-card">
            <h3>Snoring</h3>
            <p>{audioData || "No audio data yet"}</p>
          </div>
        </div>





        <div className="satisfaction-feedback">
  <h3>How satisfied are you with your sleep report?</h3>
  <div className="select-and-emoji">
    <select value={satisfaction} onChange={handleSatisfactionChange}>
      <option value="" disabled>Select your satisfaction level</option>
      <option value="😃">Very Satisfied</option>
      <option value="🙂">Satisfied</option>
      <option value="😐">Neutral</option>
      <option value="😕">Dissatisfied</option>
      <option value="😡">Very Dissatisfied</option>
    </select>
    {satisfaction && (
      <p className="selected-emoji">{satisfaction}</p>
    )}
  </div>
</div>



      </div>
    </div>
  );
}

export default SleepReport;
