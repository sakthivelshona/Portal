import React, { useState } from 'react';
import './Style.css';
import Sidebar from './Sidebar';

const FAQ = () => {
  // State to manage which question is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Sample FAQs data
  const faqs = [
    {
      question: "What are the different ways a company can hire students from the campus?",
      answer: "Campus Recruitment Program in which final year students participate & Summer Internship Program for pre final year students which can be converted into a pre placement offer."    },
    {
      question: "How can a company register itself for the Campus Recruitment Program?",
      answer:"To participate in the Campus Recruitment Program, a company must first contact CCD or register on the portal. The company is then sent the login details which would let them login enabling them to post job opportunities & see the profiles of students interested in their job opening. If the portal is unavailable, CCD will provide the JAF in an editable pdf format which the recruiter will fill and revert to the CCD."   },
    {
      question: "When does the Recruitment Process start?",
      answer: "The recruitment season is held in December every year and the PPT's can be held anytime between mid-September to mid-November." 
     },
    {
        question: "When does the Recruitment Process start?",
        answer: "The recruitment season is held in December every year and the PPT's can be held anytime between mid-September to mid-November." 
    },
  ];

  // Toggle function to show or hide the answer
  const toggleAnswer = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);  // Collapse if clicked again
    } else {
      setExpandedIndex(index); // Expand the clicked one
    }
  };

  return (
    <>
            <Sidebar/>

    <div className="faq-container">
      <h2>FAQs</h2>
      <div className="faq-cards">
        {faqs.map((faq, index) => (
          <div className="faq-card" key={index}>
            <div className="faq-question" onClick={() => toggleAnswer(index)}>
              <span>{faq.question}</span>
              <span className="faq-toggle-icon">{expandedIndex === index ? '-' : '+'}</span>
            </div>
            {expandedIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
    </>

  );
};

export default FAQ;
