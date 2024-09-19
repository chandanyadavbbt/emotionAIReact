import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

function App() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ text: '', options: [] });

  // Fetch questions on component mount
  useEffect(() => {
    axios.get(`${API_URL}/questions`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  // Handle input changes for editing questions
  const handleEditChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Handle adding options to new question
  const addOptionToNewQuestion = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, { id: newQuestion.options.length + 1, text: '' }]
    });
  };

  // Add a new question
  const addNewQuestion = () => {
    const newQuestionWithId = {
      ...newQuestion,
      id: questions.length + 1, // Set the new question id to be length of array + 1
    };
  
    axios.post(`${API_URL}/questions`, newQuestionWithId)
      .then(response => {
        setQuestions(response.data.questions);
        setNewQuestion({ text: '', options: [] }); // Clear new question input
      })
      .catch(error => console.error('Error adding question:', error));
  };
  

  // Save edits to questions
  const saveQuestion = (index) => {
    const question = questions[index];
    axios.put(`${API_URL}/questions/${question.id}`, question)
      .then(response => {
        setQuestions(response.data.questions);
      })
      .catch(error => console.error('Error saving question:', error));
  };

  return (
    <div className="App">
      <h1>Quiz Questions</h1>

      <ul>
        {questions.map((question, index) => (
          <li key={question.id}>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleEditChange(index, 'text', e.target.value)}
            />
            <ul>
              {question.options.map(option => (
                <li key={option.id}>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleEditChange(index, 'options', question.options.map(o => o.id === option.id ? { ...o, text: e.target.value } : o))
                    }
                  />
                </li>
              ))}
            </ul>
            <button onClick={() => saveQuestion(index)}>Save</button>
          </li>
        ))}
      </ul>

      <h2>Add New Question</h2>
      <input
        type="text"
        value={newQuestion.text}
        onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
        placeholder="Enter new question"
      />
      <ul>
        {newQuestion.options.map((option, index) => (
          <li key={index}>
            <input
              type="text"
              value={option.text}
              onChange={(e) => {
                const updatedOptions = [...newQuestion.options];
                updatedOptions[index].text = e.target.value;
                setNewQuestion({ ...newQuestion, options: updatedOptions });
              }}
            />
          </li>
        ))}
      </ul>
      <button onClick={addOptionToNewQuestion}>Add Option</button>
      <button onClick={addNewQuestion}>Add Question</button>
    </div>
  );
}

export default App;
