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
  // console.log(data,"this is data")

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



