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
  const number = 1;

  // Assuming you're using a database with an auto-increment field for jobId
  // Example using a simple in-memory object (replace with DB query)
  const jobId = generateUniqueJobId(); // Generate or get unique job ID
  jobData.id = jobId;

  // Save the job data (this would be a DB save in a real app)
  jobPosts.push(jobData); // or DB insert jobData
  console.log("Jobdata : ",jobData)

  // Respond with the job data including the job ID
  res.json({ jobData });
});

function generateUniqueJobId() {
  return Math.floor(Math.random() * 1000000); // Random 6-digit ID for demo purposes
}



// GET route to fetch all posted jobs
app.get('/getjobs', (req, res) => {

  console.log('GET /getjobs route hit');
  res.status(200).json(jobPosts); // Send the array of job posts as JSON
});



// DELETE route to delete a job post by id
app.delete('/deletejob/:id', (req, res) => {
  const jobId = req.params.id;  // jobId is a string now
  
  console.log('Received jobId for deletion:', jobId);  // Log jobId to verify

  // Find the job post with the matching id and remove it
  const jobIndex = jobPosts.findIndex((job) => String(job.id) === jobId);  // Ensure comparison is between strings
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
