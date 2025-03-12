import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import url from 'url';
import { CgLogIn } from 'react-icons/cg';

// Create an Express app
const app = express();
const port = 3000;

// Enable CORS for all origins (adjust as needed)
app.use(cors());

// Ensure uploads directory exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');  // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Unique file name
  }
});

const upload = multer({ storage: storage });

// Middleware to handle JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory

// Get the directory name from the current module URL
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In-memory applications and jobs arrays
let applications = []; // Student Applications
let jobs = []; // Job Posts

// Route to apply for a job
app.post('/applyJob', upload.single('resume'), (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  const { jobTitle, jobName, job_id, studentName, studentEmail, studentgithub, studentlinkedin, studentskills } = req.body;

  // Construct the resume URL based on the filename in the uploads directory
  const resumeUrl = `http://localhost:3000/uploads/${req.file.filename}`;

  const timestamp = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Ensures 12-hour format with AM/PM
  });

  applications.push({
    jobName,
    jobTitle,
    job_id,
    studentName,
    studentEmail,
    studentskills,
    studentgithub,
    studentlinkedin,
    resume: resumeUrl,
    timestamp : timestamp
  });

  console.log("Application :", applications);

  res.json({
    message: 'Application submitted successfully!',
    data: {
      jobName: jobName,
      jobTitle: jobTitle,
      job_id: job_id,
      studentName: studentName,
      studentEmail: studentEmail,
      studentskills: studentskills,
      resume: resumeUrl,  
      timestamp : timestamp,
      studentgithub : studentgithub,
      studentlinkedin : studentlinkedin
    },
  });
});

// Route to get all student applications
app.get('/getStudentApplications', (req, res) => {
  console.log('GET /getStudentApplications hit');
  console.log(applications);
  res.json({ applications });
});


// Route to handle job posts
app.post('/jobpost', (req, res) => {
  const jobData = req.body;

  // Generate a unique ID for each job post
  jobData.job_id = Date.now();
  jobs.push(jobData);
  console.log("Job data posted:", jobData);

  res.json({ jobData });
  console.log("Generated Job ID:", jobData.job_id);
});

// Route to get all job posts
app.get('/getjobs', (req, res) => {
  console.log('GET /getjobs route hit');
  res.status(200).json(jobs); // Send the array as JSON
});

// Route to create user accounts
let userdata = [];
app.post('/createAccount', (req, res) => {
  const DataAccount = req.body;
  userdata.push(DataAccount); 
  console.log(userdata);

  res.status(201).json({
    message: 'Account created successfully',
    DataAccount,
  });
});

app.put('/test', (req, res) => {
  res.send("PUT route is working!");
});


// Edit Posted Job
app.put('/update-job/:jobId', (req, res) => {
  const jobId = parseInt(req.params.jobId); // Convert jobId to integer
  const updatedJob = req.body;

  // Find the job in the jobs array by job_id
  const jobIndex = jobs.findIndex(job => job.job_id === jobId);

  if (jobIndex !== -1) {
    // If the job is found, update its details
    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob }; // Merge old job data with updated data

    // Return the updated job details as a response
    res.json({
      message: 'Job updated successfully!',
      updatedJob: jobs[jobIndex],
    });
  } else {
    // If the job is not found, send an error response
    res.status(404).json({ error: `Job with job_id ${jobId} not found.` });
  }
});

// Delete Posted Job

app.delete('/delete-job/:jobId', (req, res) => {
  const jobId = req.params.jobId;

  jobs = jobs.filter(job => job.id !== jobId);

  res.status(200).send('Job deleted successfully');
  console.log('Job deleted successfully');
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
