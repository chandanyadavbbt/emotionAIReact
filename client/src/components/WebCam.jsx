import React, { useEffect, useRef } from 'react';
import "./webcam.css"

const WebCam = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    
    const getWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    getWebcam();

   
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
      <video
        ref={videoRef}
        id="webcam"
        autoPlay
        playsInline
        
      />
     
    </div>
  );
};

export default WebCam;
