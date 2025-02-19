import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import Sidebar from '../Student/Sidebar'; // Import Sidebar component
function Mainpage() {
  return (
    <div>
      <Sidebar />
      <div className="content-main">
        <h1 className="heading-res-main">Resume Builder</h1>
        <p className="description">Choose a template to select/customize your resume</p>
        <div className="template-container-res">
          <div className="template">
            <img src="t1.png" alt="Template 1" className="template-image" />
            <p className="template-caption">
              <Link to="/template1">Template 1</Link>
            </p>
          </div>
          <div className="template">
            <img src="t2.png" alt="Template 2" className="template-image" />
            <p className="template-caption">
              <Link to="/template2">Template 2</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
