const express = require('express');
const app = express();
const cors =require("cors")
const port = 4000;
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests only from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies or other credentials
  };
  
  // Apply CORS middleware
  app.use(cors(corsOptions));
  
// Sample questions data
const questions = [
  {
    id: 1,
    text: "As a child, I was (or had) concentration problems, easily distracted",
    options: [
      { id: 'a', text: 'Not at all' },
      { id: 'b', text: 'Mildly' },
      { id: 'c', text: 'Moderately' },
      { id: 'd', text: 'Quite a Bit' },
      { id: 'e', text: 'Very Much' },
    ]
  },
  {
    id: 2,
    text: "How often do you lose track of time when working on tasks?",
    options: [
      { id: 'a', text: 'Never' },
      { id: 'b', text: 'Rarely' },
      { id: 'c', text: 'Sometimes' },
      { id: 'd', text: 'Often' },
      { id: 'e', text: 'Always' },
    ]
  },
  {
    id: 3,
    text: "How well do you manage your time when juggling multiple tasks?",
    options: [
      { id: 'a', text: 'Very Poorly' },
      { id: 'b', text: 'Poorly' },
      { id: 'c', text: 'Adequately' },
      { id: 'd', text: 'Well' },
      { id: 'e', text: 'Very Well' },
    ]
   }
];

// Endpoint to get questions
app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
