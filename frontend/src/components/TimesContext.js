import React, { createContext, useState, useContext } from 'react';

const SleepContext = createContext();

export const useSleepData = () => {
  return useContext(SleepContext);
};

export const SleepProvider = ({ children }) => {
  const [sleepTime, setSleepTime] = useState(null);
  const [wakeUpTime, setWakeUpTime] = useState(null);

  return (
    <SleepContext.Provider value={{ sleepTime, setSleepTime, wakeUpTime, setWakeUpTime }}>
      {children}
    </SleepContext.Provider>
  );
};
