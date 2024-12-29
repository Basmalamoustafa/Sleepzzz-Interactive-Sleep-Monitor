import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [audioData, setAudioData] = useState(null);

  return (
    <AudioContext.Provider value={{ audioData, setAudioData }}>
      {children}
    </AudioContext.Provider>
  );
};
