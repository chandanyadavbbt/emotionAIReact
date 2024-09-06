// import React, { useEffect, useRef } from 'react';
// import sound2 from './sound2.mp3'; // Adjust the path as needed

// const EventInfo = ({ data }) => {
//   const facesDetected = data.face_detector.totalFaces;
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (facesDetected === 0 && audioRef.current) {
//       audioRef.current.play();
//     }
//   }, [facesDetected]);

//   return (
//     <>
//       <div
//         style={{
//           position: 'fixed',
//           bottom: 20,
//           left: 20,
//           backgroundColor: 'rgba(0,0,0,0.7)',
//           color: '#fff',
//           padding: '20px',
//           borderRadius: '10px',
//         }}
//       >
//         <>
//           <p>Gender: {!data.face_gender?.mostConfident ? 'Undefined' : data.face_gender?.mostConfident}</p>
//           <p>Faces: {facesDetected}</p>
//         </>
//       </div>

//       {/* Centered warning if no faces detected */}
//       {facesDetected === 0 && (
//         <div
//           style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             backgroundColor: '#ffcc00',
//             color: '#000',
//             padding: '20px',
//             borderRadius: '10px',
//             textAlign: 'center',
//             zIndex: 1000, // Ensure it's above everything else
//           }}
//         >
//           <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Warning: Please look at the camera</p>
//         </div>
//       )}

//       {JSON.stringify(data.face_emotion?.dominantEmotion)}

//       <video id="webcam" autoPlay />

//       {/* Audio element for the warning sound */}
//       <audio ref={audioRef} src={sound2} />
//     </>
//   );
// };

// export default EventInfo;

import React, { useEffect, useRef } from 'react';
import sound2 from './sound2.mp3'; // Adjust the path as needed

const EventInfo = ({ data }) => {
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

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: '#fff',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <>
          {/* <p>Gender: {!data.face_gender?.mostConfident ? 'Undefined' : data.face_gender?.mostConfident}</p>
          <p>Faces: {facesDetected}</p> */}
        </>
      </div>

      {/* Centered warning if no faces detected */}
      {facesDetected === 0 && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffcc00',
            color: '#000',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            zIndex: 1000, // Ensure it's above everything else
          }}
        >
          <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Warning: Please look at the camera</p>
        </div>
      )}

      {/* {JSON.stringify(data.face_emotion?.dominantEmotion)} */}

      <video id="webcam" autoPlay />

      {/* Audio element for the warning sound */}
      <audio ref={audioRef} src={sound2} loop />
    </>
  );
};

export default EventInfo;

