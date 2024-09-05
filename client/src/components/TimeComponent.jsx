// import React, { useState, useEffect } from 'react';

// const TimerComponent = () => {
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSeconds(prevSeconds => {
//         if (prevSeconds === 59) {
//           setMinutes(prevMinutes => prevMinutes + 1);
//           return 0; // Reset seconds to 0 when it reaches 60
//         } else {
//           return prevSeconds + 1; // Increment seconds
//         }
//       });
//     }, 1000);

//     // Cleanup the timeout when the component is unmounted
//     return () => clearTimeout(timer);
//   }, [seconds]); // Effect will run whenever `seconds` is updated

//   return (
//     <div>
//       <p className='counter'>
//         {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
//       </p>
//     </div>
//   );
// };

// export default TimerComponent;



import React, { useState, useEffect } from 'react';

const TimerComponent = ({ isQuizCompleted }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isQuizCompleted) return; // Stop the timer when the quiz is completed

    const timer = setTimeout(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 59) {
          setMinutes(prevMinutes => prevMinutes + 1);
          return 0; // Reset seconds to 0 when it reaches 60
        } else {
          return prevSeconds + 1; // Increment seconds
        }
      });
    }, 1000);

    // Cleanup the timeout when the component is unmounted
    return () => clearTimeout(timer);
  }, [seconds, isQuizCompleted]); // Effect will run whenever `seconds` or `isQuizCompleted` is updated

  return (
    <div>
      <p className='counter'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
    </div>
  );
};

export default TimerComponent;

