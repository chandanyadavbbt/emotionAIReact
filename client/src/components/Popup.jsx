import React from 'react';
import './popup.css';

const Popup = ({ onClose, onShowResult }) => {
    function handlereStart(){
        
    }
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Thank you for the assessment!</h2>
        <p>Your answers have been recorded.</p>
        <button className="popup-button" onClick={onShowResult}>
          Show Result
        </button>
        <button o className="popup-button" onClick={onClose}>
            <a href='http://localhost:3000'>
          Restart
            </a>
        </button>
      </div>
    </div>
  );
};

export default Popup;
