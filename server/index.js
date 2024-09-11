

const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit'); // Import pdfkit
const fs = require('fs');
const port = 4000;

const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const questions = [
    {
        id: 1,
        text: "As a child, I was (or had) concentration problems, easily distracted?",
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
    },
];

// Endpoint to get questions
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

// Endpoint to handle the incoming quiz summary and generate a PDF
app.post('/api/save-summary', (req, res) => {
    const summaryData = req.body;

    console.log('Received summary data:', summaryData.questions);

    // Create a PDF document
    const doc = new PDFDocument();

    // Set the headers to indicate a file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quiz_summary.pdf');

    // Pipe the PDF stream to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(16).text('Quiz Summary', { underline: true });

    summaryData.questions.forEach((question, index) => {
        doc.moveDown()
            .fontSize(14)
            .text(`Question ${index + 1}: ${question.question}`);
    
        doc.fontSize(12)
            .text(`Selected Option: ${question.selectedOption || 'N/A'}`)
            .text(`Time Taken: ${question.timeTaken || 'N/A'}`);
    
        doc.moveDown()
            .text('Emotions:');
    
        // List the emotion percentages, but skip if value is 0
        for (const [emotion, percentage] of Object.entries(question.percentages)) {
            if (percentage > 0) {
                doc.text(`  - ${emotion}: ${percentage}%`);
            }
        }
    });
    
    // Finalize the PDF and end the stream
    doc.end();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
