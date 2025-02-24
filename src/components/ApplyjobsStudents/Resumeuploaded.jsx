import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Style.css';

const Resumeuploaded = () => {
  const navigate = useNavigate();  

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/applyjobs');  
    }, 5000); 

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="application-success">
      <div className="success-message">
        <h1>Your Application Has Been Submitted Successfully!</h1>
        <p>You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default Resumeuploaded;
