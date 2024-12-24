import React, { useEffect, useRef, useState } from 'react';

function MicrophoneSensor() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // To show upload status
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      // Optional: Process audio with AnalyserNode for visualization or pre-analysis
      const analyser = audioContextRef.current.createAnalyser();
      source.connect(analyser);

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioData(event.data); // Store audio data
        }
      };

      recorder.start();
      setIsRecording(true);

    } catch (error) {
      console.error('Error accessing microphone: ', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  const uploadAudio = async () => {
    if (!audioData) {
      console.error('No audio data to upload');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', audioData, 'recording.webm'); // Append audio Blob with a filename

      const response = await fetch('http://localhost:5000/upload-audio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(`Upload successful: ${result.message}`);
      } else {
        setUploadStatus('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
      setUploadStatus('Error during upload');
    }
  };

  return (
    <div>
      <h3>Microphone Data</h3>
      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      {audioData && (
        <div>
          <audio controls src={URL.createObjectURL(audioData)}></audio>
          <button onClick={uploadAudio}>Upload Audio</button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      )}
    </div>
  );
}

export default MicrophoneSensor;
