import React, { useState } from 'react';
import Sidebar from './Sidebar';
import studentData from './profileData.json';  // Import the JSON data

function AccountStudent() {
  // State to track if the inputs are in edit mode or view-only mode
  const [isEditable, setIsEditable] = useState(false);

  // Use imported student data as initial state
  const [formData, setFormData] = useState(studentData);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to toggle between editable and view-only modes
  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div>
      <Sidebar />
      <div className="student-account-container">
        <h1>Student Profile</h1>
        {Object.keys(formData).map((key) => (
          key !== 'resume' && (
            <div className="student-details" key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type={key === 'dob' ? 'date' : 'text'}
                name={key}
                value={formData[key]}
                readOnly={!isEditable}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          )
        ))}

        {/* Edit/Save Button */}
        <button className="save-detail-student" onClick={toggleEdit}>
          {isEditable ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
}

export default AccountStudent;
