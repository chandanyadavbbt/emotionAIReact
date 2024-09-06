import React, { useEffect, useState } from 'react';
import WebcamComponent from './components/WebcamComponent';
import EventInfo from './components/EventInfo'; // New component to display event data
import WebCam from './components/WebCam';
import Header from './components/Header';
import Question from './components/Question';
import "./App.css"

const App = () => {
  const [CY, setCY] = useState(null);
  const [eventData, setEventData] = useState(null); // State to store event data
  const [questionDisplay,setQuestionDisplay]=useState(false)
  const [faces,setFaces]=useState(null)

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(window.CY);
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initSDK = async () => {
      const CYInstance = await loadScript('https://ai-sdk.morphcast.com/v1.16/ai-sdk.js');
      setCY(CYInstance);

      CYInstance.loader()
        .licenseKey('ske45e9f79c68165608d6324b00ddec770ec9b89876fc0')
        .addModule(CYInstance.modules().FACE_DETECTOR.name)
        .addModule(CYInstance.modules().FACE_AROUSAL_VALENCE.name)
        .addModule(CYInstance.modules().FACE_ATTENTION.name)
        .addModule(CYInstance.modules().FACE_EMOTION.name)
        .addModule(CYInstance.modules().FACE_GENDER.name)
        .addModule(CYInstance.modules().FACE_FEATURES.name)
        .addModule(CYInstance.modules().FACE_POSE.name)
        .addModule(CYInstance.modules().FACE_WISH.name)
        .load()
        .then(({ start }) => start());

      window.addEventListener(CYInstance.modules().EVENT_BARRIER.eventName, (event) => {
        setEventData(event.detail); 
      });
    };

    initSDK();
  }, []);
  // function display to question
  function handleQuestion(){
    setQuestionDisplay(true)
  }

  // console.log(eventData.face_detector.totalFaces)

  return (
    <div className="App">
    <Header />
    <header className="App-header">
      {!questionDisplay ? (
        <>
          {/* <h1>Welcome to the self-Assessment Test. To start assessment click <span>below</span></h1> */}
          <h1 className='app-header-welcome'>Welcome to the self-Assessment Test. </h1>
          <p className='app-header-welcome-p' style={{textAlign:"center"}}>To start assessment click below</p>
          <button className="start" onClick={handleQuestion}>Start</button>
        </>
      ) : (
        <Question data={eventData} />
      )}
    </header>
    {CY && <WebcamComponent CY={CY} />}
    {eventData && <EventInfo data={eventData} />}
    <WebCam />
  </div>
  
  );
};

export default App;
