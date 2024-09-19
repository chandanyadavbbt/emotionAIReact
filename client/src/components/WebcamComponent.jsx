import React from 'react';

const WebcamComponent = ({ CY,setShowCamera,showCamera }) => {
  
  function handleCamera(){
    showCamera?setShowCamera(false):setShowCamera(true)

  }
  return (
    <div style={{display:"flex", position: 'fixed', top: 10, left: 100, textAlign: 'center' }}>
      <h2 onClick={handleCamera} id="heading" style={{color:"white",cursor:"pointer"}}>emotion <span className='heading-ai'>ai</span></h2>
      <ul className='links'>
        <li className='link'>About</li>
        <li className='link'>Client</li>
        <li className='link'>CaseStudy</li>
        <li className='link'>Contact Us</li>
      </ul>
    </div>
  );
};

export default WebcamComponent;
