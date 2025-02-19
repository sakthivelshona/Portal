import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing

let jobPosts = []; // In-memory array to hold job posts (replace with a database in real apps)

// POST route to create a new job post
app.post('/jobpost', (req, res) => {
  const jobData = req.body;
  jobPosts.push(jobData); // Save the job post in the array
  res.status(201).json({
    message: 'Job posted successfully',
    jobData,
  });
});

// GET route to fetch all posted jobs
app.get('/getjobs', (req, res) => {
  console.log('GET /getjobs route hit');
  res.status(200).json(jobPosts); // Send the array of job posts as JSON
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
