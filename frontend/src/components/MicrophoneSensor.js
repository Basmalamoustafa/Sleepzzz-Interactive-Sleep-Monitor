import React, { useEffect, useRef } from 'react';

function MicrophoneSensor({ isRecording, setAudioData }) {
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]); 

  useEffect(() => {
    
    return () => {
      console.log("Cleaning up microphone resources..."); 
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
          console.log("Stopped track:", track); 
        });
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().then(() => {
          console.log("Audio context closed"); 
        });
      }
    };
  }, []);

  const startRecording = async () => {
    console.log("Starting recording..."); 
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      console.log("Media stream acquired:", stream);

      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      console.log("Audio source created from stream:", source); 

   
      const analyser = audioContextRef.current.createAnalyser();
      source.connect(analyser);

      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' }); 
      mediaRecorderRef.current = recorder;

   
      chunks.current = [];

      recorder.ondataavailable = (event) => {
        console.log("Data available from recorder:", event); 
        if (event.data.size > 0) {
          chunks.current.push(event.data);
          console.log("Chunk added:", event.data); 
        }
      };

      recorder.start();
      console.log("Recording started...");
    } catch (error) {
      console.error('Error accessing microphone: ', error); 
    }
  };

  const stopRecording = () => {
    console.log("Stopping recording...");
    if (mediaRecorderRef.current) {
   
      mediaRecorderRef.current.onstop = () => {
        console.log("MediaRecorder stopped.");
        if (chunks.current.length > 0) {
          sendAudioToBackend();
        } else {
          console.error("No audio chunks were recorded.");
        }
      };
  
      mediaRecorderRef.current.stop();
    }
  
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
        console.log("Stopped track:", track);
      });
    }
  };
  

  const sendAudioToBackend = async () => {
    console.log("Preparing to send audio to backend..."); 

  
    const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });
    console.log("Blob size before sending:", audioBlob.size); 

    if (audioBlob.size === 0) {
      console.error("Audio blob is empty!");
      return;
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'recorded-audio.webm');

    try {
      console.log("Sending request to backend..."); 
      const response = await fetch(' https://56e3-82-129-198-66.ngrok-free.app/upload-audio', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Backend response:', data.message); 

      setAudioData(data.message);

    } catch (error) {
      console.error('Error sending audio to backend:', error); 
    }



  };

  useEffect(() => {
    if (isRecording) {
      console.log("isRecording is true, starting recording..."); 
      startRecording();
    } else {
      console.log("isRecording is false, stopping recording..."); 
      stopRecording();
      if (mediaRecorderRef.current?.state === 'inactive') {
        console.log("Recorder state is inactive, preparing to send audio..."); 
        sendAudioToBackend();
      }
    }
  }, [isRecording]); 

  return (
    <div>
      {isRecording ? (
        <p>Recording...</p>
      ) : (
        <p>Not recording</p>
      )}
    </div>
  );
}

export default MicrophoneSensor;

   