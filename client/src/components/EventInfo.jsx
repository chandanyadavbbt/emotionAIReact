import React, { useEffect, useRef, useState } from 'react';
import sound2 from './sound2.mp3'; // Adjust the path as needed

const EventInfo = ({ data }) => {
  const [showEventInfo,setShowEventInfo]=useState(false)
  const facesDetected = data.face_detector.totalFaces;
  const audioRef = useRef(null);

  useEffect(() => {
    if (facesDetected === 0 && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start
    }
  }, [facesDetected]);

  // show hide event info\
  function handleEventInfo(){
    showEventInfo?setShowEventInfo(false):setShowEventInfo(true)
  }

  return (
    <>
      {/* Container that holds all content, blurred when facesDetected === 0 */}
      <div
        style={{
          filter: facesDetected === 0 ? 'blur(8px)' : 'none', // Apply blur when warning message is shown
          transition: 'filter 0.3s ease-in-out', // Smooth transition
        }}
      >
        <div onClick={handleEventInfo}
          style={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: '#fff',
            padding: '20px',
            borderRadius: '10px',
            cursor:"pointer"
          }}
        >
          {/* You can uncomment and add other content here */}
          {showEventInfo &&
              <>
            <p>Gender: {!data.face_gender?.mostConfident ? 'Undefined' : data.face_gender?.mostConfident}</p>
          <p>Faces: {facesDetected}</p>
              </>
          }
        </div>
      </div>

      {/* Centered warning if no faces detected */}
      {facesDetected === 0 && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, 70%)',
            backgroundColor: '#ffcc00',
            color: '#000',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            zIndex: 1000, 
            backdropFilter: 'blur(80px)',
          }}
        >
          {/* <p style={{ fontWeight: 'bold', fontSize: '48px',color:"red" }}>Warning: Please look at the camera</p> */}
        </div>
      )}

      {/* Audio element for the warning sound */}
      {/* <audio ref={audioRef} src={sound2} loop /> */}
    </>
  );
};

export default EventInfo;
