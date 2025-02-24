import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

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
  destination: (req, file, cb) => {
    // Specify the folder where uploaded files should be stored
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Use a unique file name based on the current timestamp
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Filter to allow only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(new Error('Only PDF files are allowed.'));
  }
  cb(null, true);
};

// Initialize multer with the storage and file filter configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Middleware to handle JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle job application
app.post('/applyJob', upload.single('resume'), (req, res) => {
  console.log('Request Body:', req.body);  // Log the form data here
  console.log('Uploaded File:', req.file);  // Log the file data here

  const { jobTitle, jobName, studentName, studentEmail, studentskills } = req.body;
  const resume = req.file;

  // Log the received data to see if it's coming through
  console.log('Job Title:', jobTitle);
  console.log('Job Name:', jobName);
  console.log('Student Name:', studentName);
  console.log('Student Email:', studentEmail);
  console.log('Student Skills:', studentskills);
  console.log('Resume:', resume);

  // Respond with the application details, including student data
  res.json({
    message: 'Application submitted successfully!',
    data: {
      jobName: jobName,
      jobTitle: jobTitle,
      studentName: studentName,  // Include student name
      studentEmail: studentEmail,  // Include student email
      studentskills: studentskills,  // Include student skills
      resume: resume.filename,  // Include the resume file
    },
  });
});





// Route to handle job posts (simulated)
let jobPosts = []; // Temporary in-memory job posts storage
app.post('/jobpost', (req, res) => {
  const jobData = req.body;

  // Generate a unique ID for each job post
  jobData.id = Date.now();
  jobPosts.push(jobData);
  console.log("Job data posted:", jobData);

  res.json({ jobData });
});

// Route to get all job posts
app.get('/getjobs', (req, res) => {
  console.log('GET /getjobs route hit');
  res.status(200).json(jobPosts); // Send the array as JSON
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
