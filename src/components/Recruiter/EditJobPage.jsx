import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Style.css';

function EditJobPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { job } = location.state;  // Extract the job details passed from SuccessPage

  const [formData, setFormData] = useState(job);  // Initialize formData with job details
  const [skills, setSkills] = useState(job.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  // Check if all form fields are filled
  useEffect(() => {
    const isValid = Object.values(formData).every(field => 
      typeof field === 'string' ? field.trim() !== "" : field !== ""
    ) && skills.length > 0;
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

  const handleUpdateJob = () => {
    const updatedJob = {
      ...formData,
      skills,
    };

    fetch(`http://localhost:3000/update-job/${job.job_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Job updated successfully:', data);
        navigate('/success'); // Redirect to the success page after update
      })
      .catch(error => {
        console.error('Error updating job:', error);
      });
  };

  return (
    <div className='containers'>
      <Sidebar />
      <div className="main-content">
          <h1>Edit Job Details</h1>
        <div className="form-container">
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

          {/* Update Button */}
          <button
            className="post-button"
            type="button"
            onClick={handleUpdateJob}
            disabled={!isFormValid}
          >
            Update Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditJobPage;
