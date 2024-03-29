// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { addVote } =  require("./addVote.js");
// Create an Express app
const app = express();

// Use middleware to parse JSON request body and enable CORS
app.use(bodyParser.json());
app.use(cors());

// Define a POST route that receives an object 'ballot' in the request body
app.post('/api/confirm', (req, res) => {
  const confirm = req.body;

  // Do something with the object
  console.log();
  addVote(ballotObject);

  // Send a response back to the client
  res.status(200).json({ message: 'Received ballot successfully' });
});

// Start the Express server
app.listen(3002, () => {
  console.log('Server started on port 3002');
});
