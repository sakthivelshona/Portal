import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Style.css';

function Jobposting() {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    location: "",
    website: "",
    ctc: "",
    jobResponsibility: "",
    jobRequirement: "",
    jobDescription: "",
    deadline : ""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // Check if all form fields are filled
  useEffect(() => {
    const isValid = Object.values(formData).every(field => field.trim() !== "") && skills.length > 0;
    setIsFormValid(isValid);
  }, [formData, skills]);

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput(""); // Clear input field after adding
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePostJob = () => {

    const jobData = {
      ...formData,
      skills,  // Include the skills array
    };
    console.log('Job Data:', jobData); // Log the job data before posting

    // Post data to the backend
    fetch('http://localhost:3000/jobpost', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    })
      .then(response => response.json())
      .then((data) => {
        console.log('Job posted successfully:', data);  // Log the entire response
        if (data && data.jobData && data.jobData.job_id) {
          alert('Job posted successfully!');
          console.log('Received Job ID:', data.jobData.job_id);
      
          // Navigate to success page with job data (including the ID)
          navigate('/success', { state: { jobData: data.jobData } });
        } else {
          console.error('No Job ID received from the backend.');
        }
      })
      
      .catch(error => {
        console.error('Error posting job:', error);
        alert('Error posting job');
      });
  };

  return (
    <div>
      <Sidebar />

      <div className="main-content">
        <h1 className="centered-text">Post Job</h1>

        <div className="form-container">
          {/* Job Title, Company, Workplace Type */}
          <div className="form-group">
          <input
              type="text"
              id="company"
              placeholder="Enter Company Name"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              id="jobTitle"
              placeholder="Enter Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
            
            {/* Job Description */}
          <div className="form-group">
            <textarea
              id="jobDescription"
              rows="4"
              placeholder="Enter Job Description"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
      
            <input
              type="text"
              id="location"
              placeholder="Enter Job Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="website"
              placeholder="Enter Website URL"
              value={formData.website}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              id="ctc"
              placeholder="Enter CTC"
              value={formData.ctc}
              onChange={handleChange}
              required
            />
          </div>

          {/* Job Responsibilities */}
          <div className="form-group">
            <textarea
              id="jobResponsibility"
              rows="4"
              placeholder="Enter Job Responsibilities"
              value={formData.jobResponsibility}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Job Requirements */}
          <div className="form-group">
            <textarea
              id="jobRequirement"
              rows="4"
              placeholder="Enter Job Requirements"
              value={formData.jobRequirement}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          
          {/* Skills */}
          <div className="form-group">
            <div className="skills-input-container">
              <input
                type="text"
                id="skills"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter all your specialized skills"
                required
              />
              <button type="button" onClick={addSkill}>Add Skill</button>
            </div>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span>{skill}</span>
                  <button onClick={() => removeSkill(skill)}>Remove</button>
                </div>
              ))}
            </div>
            <input
              type="date"
              id="deadline"
              placeholder="Enter Deadline date"
              value={formData.deadline}
              onChange={handleChange}
              required
            />

          </div>

       
          {/* Post Button */}
          <button
            className="post-button"
            type="button"
            onClick={handlePostJob}
            disabled={!isFormValid}
          >
            Post Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default Jobposting;
