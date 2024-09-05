import React from 'react';

const WebcamComponent = ({ CY }) => {
  return (
    <div style={{ position: 'fixed', top: 10, left: 100, textAlign: 'center' }}>
      <h2 id="heading" style={{color:"white"}}>emotion <span className='heading-ai'>ai</span></h2>
      <video
        id="webcam"
        autoPlay
        style={{ width: '200px', height: '150px', borderRadius: '10px' }}
      ></video>
    </div>
  );
};

export default WebcamComponent;
