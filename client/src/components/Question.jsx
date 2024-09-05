// import React, { useEffect, useState } from 'react';
// import './question.css';
// import TimerComponent from './TimeComponent';

// const Question = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [counter,setCounter]=useState(0)

//   // update counter
//   useEffect(()=>{
//     setTimeout(()=>{
//       setCounter(counter+1)
//     },1000)
//   },[counter])

//   const handleNextQuestion = (nextQuestion, optionId) => {
//     setSelectedOptions({
//       ...selectedOptions,
//       [currentQuestion]: optionId,
//     });
//     setCurrentQuestion(nextQuestion);
//   };

//   const isOptionSelected = (optionId) => {
//     return selectedOptions[currentQuestion] === optionId;
//   };

//   const renderQuestion = () => {
//     switch (currentQuestion) {
//       case 1:
//         return (
//           <div className="question-block">
//             <div className="question-text">
//               1. As a child, I was (or had) concentration problems, easily distracted
//             </div>
//             <ul className="options">
//               {['a', 'b', 'c', 'd', 'e'].map((option) => (
//                 <li key={option} className={`option ${isOptionSelected(`q1${option}`) ? 'selected' : ''}`}>
//                   <input
//                     type="radio"
//                     name="q1"
//                     id={`q1${option}`}
//                     value={option}
//                     onClick={() => handleNextQuestion(2, `q1${option}`)}
//                     checked={false} // Reset selection when moving to the next question
//                   />
//                   <label htmlFor={`q1${option}`}> {` ${option.toUpperCase()}) ${getLabelForOption(1, option)}`}</label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="question-block">
//             <div className="question-text">
//               2. How often do you lose track of time when working on tasks?
//             </div>
//             <ul className="options">
//               {['a', 'b', 'c', 'd', 'e'].map((option) => (
//                 <li key={option} className={`option ${isOptionSelected(`q2${option}`) ? 'selected' : ''}`}>
//                   <input
//                     type="radio"
//                     name="q2"
//                     id={`q2${option}`}
//                     value={option}
//                     onClick={() => handleNextQuestion(3, `q2${option}`)}
//                     checked={false} // Reset selection when moving to the next question
//                   />
//                   <label htmlFor={`q2${option}`}> {` ${option.toUpperCase()}) ${getLabelForOption(2, option)}`}</label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="question-block">
//             <div className="question-text">
//               3. How well do you manage your time when juggling multiple tasks?
//             </div>
//             <ul className="options">
//               {['a', 'b', 'c', 'd', 'e'].map((option) => (
//                 <li key={option} className={`option ${isOptionSelected(`q3${option}`) ? 'selected' : ''}`}>
//                   <input
//                     type="radio"
//                     name="q3"
//                     id={`q3${option}`}
//                     value={option}
//                     onClick={() => handleNextQuestion('submit', `q3${option}`)}
//                     checked={false} // Reset selection when moving to the next question
//                   />
//                   <label htmlFor={`q3${option}`}> {` ${option.toUpperCase()}) ${getLabelForOption(3, option)}`}</label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         );
//       case 'submit':
//         return (
//           <div className="submit-block">
//             <a href="./result.html" id="submitButton">
//               <button className="submit-button" onClick={() => console.log('Assessment Complete')}>SUBMIT</button>
//             </a>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const getLabelForOption = (questionNumber, option) => {
//     const labels = {
//       1: ['Not at all', 'Mildly', 'Moderately', 'Quite a Bit', 'Very Much'],
//       2: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
//       3: ['Very Poorly', 'Poorly', 'Adequately', 'Well', 'Very Well'],
//     };
//     return labels[questionNumber][option.charCodeAt(0) - 97];
//   };

//   return (
//     <>
//     <div className="quiz-container">
//       <div className="quiz-container-counter">
      
//        {<>

//        {/* <p>Time</p> */}
//          <TimerComponent/>
//        </>
//          }
//       </div>
//       {renderQuestion()}
//     </div>
//     </>
//   );
// };

// export default Question;
// import React, { useEffect, useState } from 'react';
// import './question.css';
// import TimerComponent from './TimeComponent';

// const Question = ({data}) => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});

//   console.log(data)
//   useEffect(() => {
//     // Fetch questions from the backend
//     fetch('http://localhost:4000/api/questions')
//       .then(response => response.json())
//       .then(data => setQuestions(data));
//   }, []);

//   const handleNextQuestion = (nextQuestionIndex, optionId) => {
//     setSelectedOptions({
//       ...selectedOptions,
//       [questions[currentQuestionIndex].id]: optionId,
//     });
//     setCurrentQuestionIndex(nextQuestionIndex);
//   };

//   const isOptionSelected = (optionId) => {
//     return selectedOptions[questions[currentQuestionIndex]?.id] === optionId;
//   };

//   const renderQuestion = () => {
//     if (questions.length === 0) return null; // Avoid rendering until questions are fetched

//     const currentQuestion = questions[currentQuestionIndex];
//     if (!currentQuestion) return null;

//     return (
//       <div className="question-block">
//         <div className="question-text">
//           {currentQuestionIndex + 1}. {currentQuestion.text}
//         </div>
//         <ul className="options">
//           {currentQuestion.options.map((option) => (
//             <li key={option.id} className={`option ${isOptionSelected(option.id) ? 'selected' : ''}`}>
//               <input
//                 type="radio"
//                 name={`q${currentQuestion.id}`}
//                 id={option.id}
//                 value={option.id}
//                 onClick={() => handleNextQuestion(currentQuestionIndex + 1, option.id)}
//                 checked={false} // Reset selection when moving to the next question
//               />
//               <label htmlFor={option.id}>{` ${option.id.toUpperCase()}) ${option.text}`}</label>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="quiz-container">
//         <div className="quiz-container-counter">
//           <TimerComponent />
//         </div>
//         {renderQuestion()}
//       </div>
//     </>
//   );
// };

// export default Question;



// import React, { useEffect, useState } from 'react';
// import './question.css';
// import TimerComponent from './TimeComponent';

// const Question = ({ data }) => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   console.log(data)

//   useEffect(() => {
//     // Fetch questions from the backend
//     fetch('http://localhost:4000/api/questions')
//       .then(response => response.json())
//       .then(data => setQuestions(data));
//   }, []);

//   const handleNextQuestion = (nextQuestionIndex, optionId) => {
//     const currentQuestion = questions[currentQuestionIndex];
//     const emotions = data.emotions; // Assume data.emotions contains the emotion data for the current question

//     // Save the emotions for the current question in local storage
//     localStorage.setItem(
//       `q${currentQuestionIndex + 1}`,
//       JSON.stringify(emotions)
//     );

//     // Update selected options and move to the next question
//     setSelectedOptions({
//       ...selectedOptions,
//       [currentQuestion.id]: optionId,
//     });
//     setCurrentQuestionIndex(nextQuestionIndex);
//   };

//   const isOptionSelected = (optionId) => {
//     return selectedOptions[questions[currentQuestionIndex]?.id] === optionId;
//   };

//   const renderQuestion = () => {
//     if (questions.length === 0) return null; // Avoid rendering until questions are fetched

//     const currentQuestion = questions[currentQuestionIndex];
//     if (!currentQuestion) return null;

//     return (
//       <div className="question-block">
//         <div className="question-text">
//           {currentQuestionIndex + 1}. {currentQuestion.text}
//         </div>
//         <ul className="options">
//           {currentQuestion.options.map((option) => (
//             <li key={option.id} className={`option ${isOptionSelected(option.id) ? 'selected' : ''}`}>
//               <input
//                 type="radio"
//                 name={`q${currentQuestion.id}`}
//                 id={option.id}
//                 value={option.id}
//                 onClick={() => handleNextQuestion(currentQuestionIndex + 1, option.id)}
//                 checked={false} // Reset selection when moving to the next question
//               />
//               <label htmlFor={option.id}>{`${option.id.toUpperCase()}) ${option.text}`}</label>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="quiz-container">
//         <div className="quiz-container-counter">
//           <TimerComponent />
//         </div>
//         {renderQuestion()}
//       </div>
//     </>
//   );
// };

// export default Question;



import React, { useEffect, useState } from 'react';
import './question.css';
import TimerComponent from './TimeComponent';

const Question = ({ data }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [emotionCounts, setEmotionCounts] = useState({
    Angry: 0,
    Disgust: 0,
    Fear: 0,
    Happy: 0,
    Neutral: 0,
    Sad: 0,
    Surprise: 0
  });
  console.log(data)

  useEffect(() => {
    // Fetch questions from the backend
    fetch('http://localhost:4000/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  useEffect(() => {
    if (data) {
      // Extract emotion data from the received data
      const { face_emotion } = data;
      if (face_emotion) {
        const { dominantEmotion, emotion } = face_emotion;

        // Update emotion counts based on dominant emotion
        if (dominantEmotion && emotion[dominantEmotion] !== undefined) {
          setEmotionCounts(prevCounts => {
            const updatedCounts = { ...prevCounts };
            updatedCounts[dominantEmotion] += 1; // Increment count of dominant emotion
            return updatedCounts;
          });
        }
      }
    }
  }, [data]);

  const handleNextQuestion = (nextQuestionIndex, optionId) => {
    // Save emotion counts to local storage
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      localStorage.setItem(
        `q${currentQuestionIndex + 1}`,
        JSON.stringify(emotionCounts)
      );
    }

    // Reset emotion counts for the next question
    setEmotionCounts({
      Angry: 0,
      Disgust: 0,
      Fear: 0,
      Happy: 0,
      Neutral: 0,
      Sad: 0,
      Surprise: 0
    });

    // Update selected options and move to the next question
    setSelectedOptions({
      ...selectedOptions,
      [questions[currentQuestionIndex].id]: optionId,
    });
    setCurrentQuestionIndex(nextQuestionIndex);
  };

  const isOptionSelected = (optionId) => {
    return selectedOptions[questions[currentQuestionIndex]?.id] === optionId;
  };

  const renderQuestion = () => {
    if (questions.length === 0) return null; // Avoid rendering until questions are fetched

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
      <div className="question-block">
        <div className="question-text">
          {currentQuestionIndex + 1}. {currentQuestion.text}
        </div>
        <ul className="options">
          {currentQuestion.options.map((option) => (
            <li key={option.id} className={`option ${isOptionSelected(option.id) ? 'selected' : ''}`}>
              <input
                type="radio"
                name={`q${currentQuestion.id}`}
                id={option.id}
                value={option.id}
                onClick={() => handleNextQuestion(currentQuestionIndex + 1, option.id)}
                checked={false} // Reset selection when moving to the next question
              />
              <label htmlFor={option.id}>{`${option.id.toUpperCase()}) ${option.text}`}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="quiz-container">
        <div className="quiz-container-counter">
          <TimerComponent />
        </div>
        {renderQuestion()}
      </div>
    </>
  );
};

export default Question;


