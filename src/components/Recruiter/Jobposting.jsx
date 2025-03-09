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
    jobtype: "",
    website: "",
    ctc: "",
    jobResponsibility: "",
    jobRequirement: "",
    jobDescription: "",
    deadline: ""
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

    // If the field is CTC, append 5 zeros to the entered number
    if (id === "ctc" && value) {
      setFormData({ ...formData, [id]: value + "00000" }); // Add 5 zeros to CTC
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handlePostJob = () => {
    // Check if all fields are filled before posting
    const requiredFields = [
      'company',
      'jobTitle',
      'location',
      'jobtype',
      'website',
      'ctc',
      'jobResponsibility',
      'jobRequirement',
      'jobDescription',
      'deadline'
    ];

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
        <h1>Post Job</h1>
        <div className="form-container">
          {/* Job Title, Company, Workplace Type */}
          <h4 className='side-heading'>Job Detail</h4>

          <div className="form-group">
            <div className="formn-new-change">

              <input
                type="text"
                id="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="location"
                placeholder="Job Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
               <input
                type="text"
                id="jobtype"
                placeholder="Job Type"
                value={formData.jobtype}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                id="ctc"
                placeholder="CTC"
                value={formData.ctc}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Job Description */}
          <div className="form-group">
            <textarea
              id="jobDescription"
              rows="4"
              placeholder="Job Description"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Job Responsibilities */}
          <h4 className='side-heading'>Job Responsibilities</h4>
          <div className="form-group">
            <textarea
              id="jobResponsibility"
              rows="4"
              value={formData.jobResponsibility}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Job Requirements */}
          <h4 className='side-heading'>Job Requirements</h4>
          <div className="form-group">
            <textarea
              id="jobRequirement"
              rows="4"
              value={formData.jobRequirement}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Skills */}
          <h4 className='side-heading'>Skills</h4>
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

            <h4 className='side-heading'>Deadline</h4>
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
