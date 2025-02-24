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

  jobData.id = Date.now(); // Unique ID (this could be handled by a database)


  // Save the job data (this would be a DB save in a real app)
  jobPosts.push(jobData); // or DB insert jobData
  console.log("Jobdata : ",jobData)

  // Respond with the job data including the job ID
  res.json({ jobData });
});



// GET route to fetch all posted jobs
app.get('/getjobs', (req, res) => {

  console.log('GET /getjobs route hit');
  res.status(200).json(jobPosts); // Send the array of job posts as JSON
});



// Assuming you're using Express for your server

app.post('/deletedjobs', (req, res) => {
  const job = req.body;

  // Logic to save the deleted job in another database or collection
  // For example, if using MongoDB:
  DeletedJobModel.create(job)
    .then(() => res.status(201).send('Job stored in deleted jobs DB'))
    .catch((error) => {
      console.error('Error storing job in deleted jobs DB:', error);
      res.status(500).send('Failed to store job in deleted jobs DB');
    });
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
