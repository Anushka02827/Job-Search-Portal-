const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'job_search_portal' // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // SQL query to insert user input into the database
  const sql = 'INSERT INTO Users (User Name, UserEmail, UserMessage) VALUES (?, ?, ?)';

  connection.query(sql, [name, email, message], (err, results) => {
    if (err) {
      console.error('Error inserting data: ' + err);
      return res.status(500).send('Error saving data');
    }
    res.status(200).send('Data saved successfully with ID: ' + results.insertId);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});