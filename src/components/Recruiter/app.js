import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';  // Import UUID package

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing

let jobPosts = []; // In-memory array to hold job posts (replace with a database in real apps)

// POST route to create a new job post
app.post('/jobpost', (req, res) => {
  const jobData = req.body;
  
  // Generate a unique ID for the new job post
  const jobWithId = {
    ...jobData,
    id: uuidv4(), // Add a unique id
  };

  jobPosts.push(jobWithId); // Save the job post in the array
  res.status(201).json({
    message: 'Job posted successfully',
    jobData: jobWithId,  // Send back the job with the unique ID
  });
});


// GET route to fetch all posted jobs
app.get('/getjobs', (req, res) => {
  console.log('GET /getjobs route hit');
  res.status(200).json(jobPosts); // Send the array of job posts as JSON
});



// DELETE route to delete a job post by id
app.delete('/deletejob/:id', (req, res) => {
  const jobId = req.params.id;
  
  // Find the job post with the matching id and remove it
  const jobIndex = jobPosts.findIndex((job) => job.id === jobId);
  if (jobIndex === -1) {
    return res.status(404).json({ error: 'Job not found' });
  }

  jobPosts.splice(jobIndex, 1); // Remove the job from the array
  res.status(200).json({ message: 'Job deleted successfully' });
});



// Account creation route 
let userdata = [];

app.post('/createAccount', (req, res) => {
  const Data = req.body;
  userdata.push(Data); // Save the user data
  console.log(userdata);

  res.status(201).json({
    message: 'Account created successfully',
    Data,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
