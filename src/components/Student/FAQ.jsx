import React, { useState } from 'react';
import Sidebar from './Sidebar';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    { question: "What are the different ways a company can hire students from the campus?", answer: "Campus Recruitment Program..." },
    { question: "How can a company register for the Campus Recruitment Program?", answer: "Contact CCD or register on the portal..." },
    { question: "When does the Recruitment Process start?", answer: "The recruitment season is held in December..." },
  ];

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="containers">
      <Sidebar />
      <div className="faq-container">
        <h1>FAQs</h1>
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
    </div>
  );
};

export default FAQ;
