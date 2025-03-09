import React, { useState } from 'react';
import Sidebar from './Sidebar';
import studentData from './profileData.json';  // Import the JSON data

function AccountStudent() {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState(studentData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
     <div className="containers">
      <Sidebar />
      <div className="sided">
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
