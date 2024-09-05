import React from 'react';

const EventInfo = ({ data }) => {
    // console.log(data)
    
  return (
    <>
    <div style={{ position: 'fixed', bottom: 20, left: 20, backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', padding: '20px', borderRadius: '10px' }}>
      {<>
        <p>Gender:{!data.face_gender?.mostConfident?"Undefined":data.face_gender?.mostConfident}</p>
        <p>Faces:{data.face_detector.totalFaces}</p>
      </>
        }
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {/* {JSON.stringify(data, null, 2)} */}
      </pre>
    </div>
    {JSON.stringify(data.face_emotion?.dominantEmotion)}
        {/* {JSON.stringify(data, null, 2)} */}
    <video id="webcam" autoPlay/>
    </>
  );
};

export default EventInfo;
