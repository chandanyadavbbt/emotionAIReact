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
    Surprise: 0,
  });
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); 
  const [summary, setSummary] = useState([]); 
  const [summaryData, setSummaryData] = useState([]); 
  const [startTime, setStartTime] = useState(null); 
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalQuizTime, setTotalQuizTime] = useState(0); 
  console.log(questions)

  useEffect(() => {
    // Fetch questions from the backend
    fetch('http://localhost:4000/api/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data));

    setStartTime(Date.now()); // Record quiz start time
  }, []);

  useEffect(() => {
    if (data) {
      // Extract emotion data from the received data
      const { face_emotion } = data;
      if (face_emotion) {
        const { dominantEmotion, emotion } = face_emotion;

        // Update emotion counts based on dominant emotion
        if (dominantEmotion && emotion[dominantEmotion] !== undefined) {
          setEmotionCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts };
            updatedCounts[dominantEmotion] += 1; // Increment count of dominant emotion
            return updatedCounts;
          });
        }
      }
    }

    setQuestionStartTime(Date.now()); // Start time for each question
  }, [data, currentQuestionIndex]);

  const handleNextQuestion = (nextQuestionIndex, optionId) => {
    const isLastQuestion = nextQuestionIndex >= questions.length;
    const questionEndTime = Date.now(); 
    const timeTakenForQuestion = (questionEndTime - questionStartTime) / 1000; 
  
    // Save emotion counts and time taken to local storage
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      localStorage.setItem(
        `q${currentQuestionIndex + 1}`,
        JSON.stringify({
          emotionCounts,
          timeTaken: timeTakenForQuestion, 
        })
      );
    }
  
    if (isLastQuestion) {
      const totalTimeTaken = (questionEndTime - startTime) / 1000; 
      setTotalQuizTime(totalTimeTaken);
      setIsQuizCompleted(true); 
      calculateSummary(); 
  
     
      return;
    }
  
    setEmotionCounts({
      Angry: 0,
      Disgust: 0,
      Fear: 0,
      Happy: 0,
      Neutral: 0,
      Sad: 0,
      Surprise: 0,
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

  // Calculate the percentage summary of emotions for each question
  const calculateSummary = () => {
    const summaryArray = [];

    for (let i = 0; i < questions.length; i++) {
      const savedData = JSON.parse(localStorage.getItem(`q${i + 1}`));

      if (savedData) {
        const { emotionCounts, timeTaken } = savedData;

        const totalEmotions = Object.values(emotionCounts).reduce(
          (acc, count) => acc + count,
          0
        ); // Total emotion counts for the question

        // Calculate percentage for each emotion
        const percentageCounts = {};
        for (let emotion in emotionCounts) {
          const count = emotionCounts[emotion];
          percentageCounts[emotion] =
            totalEmotions > 0
              ? ((count / totalEmotions) * 100).toFixed(2)
              : 0;
        }

        summaryArray.push({
          question: `Question ${i + 1}`,
          percentages: percentageCounts,
          timeTaken, // Add time taken for the question
          selectedOption: selectedOptions[questions[i].id], // Add selected response
        });
      }
    }

    setSummary(summaryArray); // Store the summary
    setSummaryData(summaryArray); // Update summaryData for download
  };

  // download summary
  const downloadSummary = () => {
    const dataToDownload = {
      totalQuizTime: `${totalQuizTime} seconds`, // Add total quiz time to the download
      questions: summaryData.map((item, index) => ({
        question: item.question,
        percentages: item.percentages,
        timeTaken: `${item.timeTaken} seconds`, // Include time taken for each question
        selectedOption: item.selectedOption, // Include selected option
      })),
    };

    const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'quiz_summary.json';
    link.click();
  };

  const handleRestart = () => {
    window.location.reload(); // Restart the quiz by reloading the page
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
            <li
              key={option.id}
              className={`option ${
                isOptionSelected(option.id) ? 'selected' : ''
              }`}
            >
              <input
                type="radio"
                name={`q${currentQuestion.id}`}
                id={option.id}
                value={option.id}
                onClick={() =>
                  handleNextQuestion(currentQuestionIndex + 1, option.id)
                }
                checked={false} // Reset selection when moving to the next question
              />
              <label htmlFor={option.id}>
                {`${option.id.toUpperCase()}) ${option.text}`}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div className="summary-container">
      <h2>Emotion Summary</h2>
      {summary.map((item, index) => (
        <div key={index} className="summary-item">
          <h3>{item.question}</h3>
          <ul>
            {Object.entries(item.percentages).map(([emotion, percentage]) => (
              <li key={emotion}>
                {emotion}: {percentage}%
              </li>
            ))}
          </ul>
          <p>Time taken: {item.timeTaken} seconds</p>
          <p>Selected Option: {item.selectedOption}</p>
        </div>
      ))}
      <p>Total Quiz Time: {totalQuizTime} seconds</p>
    </div>
    );
  };

  return (
    <>
      <div className="quiz-container">
        <div className="quiz-container-counter">
          {/* <TimerComponent isQuizCompleted={isOptionSelected}/> */}
          <TimerComponent isQuizCompleted={isQuizCompleted} />

        </div>
        {isQuizCompleted ? (
          <div>
            <h2>Quiz Completed!</h2>
            {renderSummary()}
            <button onClick={handleRestart}>Restart</button>
            <button  onClick={downloadSummary}>Download</button>
          </div>
        ) : (
          renderQuestion()
        )}
      </div>
    </>
  );
};

export default Question;                                 
