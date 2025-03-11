import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import url from 'url';

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



let applications = []; //Student Application

app.post('/applyJob', upload.single('resume'), (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  const { jobTitle, jobName, job_id, studentName, studentEmail,studentgithub, studentlinkedin,studentskills } = req.body;

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
      studentgithub :studentgithub,
      studentlinkedin :studentlinkedin

    },
  });
});

app.get('/getStudentApplications', (req, res) => {
  console.log('GET /getStudentApplications hit');
  console.log(applications)
  res.json({ applications });

});


app.delete('/deleteApplication/:job_id', (req, res) => {
  const { job_id } = req.params;

  // Find the application in the "database"
  const index = applications.findIndex(app => app.job_id === job_id);

  if (index !== -1) {
    // Remove the application from the array
    applications.splice(index, 1);

    res.status(200).json({ message: `Application with job_id ${job_id} deleted successfully.` });
  } else {
    res.status(404).json({ error: `Application with job_id ${job_id} not found.` });
  }
  console.log("Deleted")
});



// Route to handle job posts (simulated)
let jobPosts = []; // Temporary in-memory job posts storage
app.post('/jobpost', (req, res) => {
  const jobData = req.body;

  // Generate a unique ID for each job post
  jobData.job_id = Date.now();
  jobPosts.push(jobData);
  console.log("Job data posted:", jobData);

  res.json({ jobData });
  console.log("Generated Job ID:", jobData.job_id);

});



// Route to get all job posts
app.get('/getjobs', (req, res) => {
  console.log('GET /getjobs route hit');
  res.status(200).json(jobPosts); // Send the array as JSON
});


//Account created for individuals
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




// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
