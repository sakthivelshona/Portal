import React from 'react';
import './App.css';

const Sample = () => {
  return (
    <div className="containers">
      <div className="sidebars">
        <ul>
          <li>Home</li>
          <li>Account</li>
          <li>Post</li>
          <li>Info</li>
        </ul>
      </div>
      <div className="main-contents">
        <h1>Welcome to the Homepage!</h1>
        <p>This is a simple homepage with a sidebar on the left. You can add more sections, images, and text as needed.</p>
        <img src="https://via.placeholder.com/500" alt="Placeholder" />
      </div>
    </div>
  );
}

export default Sample;
