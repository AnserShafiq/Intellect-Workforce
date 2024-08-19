import React, { useState, useRef } from 'react';
import './ComponentsStyles/IndustryCard.css';
import { NavLink } from 'react-router-dom';

const IndustryCard = ({ industry }) => {
  const [showMainText, setShowMainText] = useState(true);
  const mainTextRef = useRef(null);
  const backTextRef = useRef(null);

  const replaceContent = () => {
    setShowMainText(!showMainText);
  };

  return (
    <div className="industry-card">
      <div className="industry-image">
        <div className='front' style={{ backgroundImage: `url(${industry.image})` }}>
          <div className='front-content'>
            <h2>{industry.name}</h2>
          </div>
        </div>

        <div className="back" style={{ backgroundImage: `url(${industry.image})` }}>
          <div className="back-content" ref={mainTextRef} style={{ display: showMainText ? 'block' : 'none' }}>
            <h2>{industry.name}</h2>
            <p><b>Roles:</b> {industry.roles}</p>
            <p><b>Focus:</b> {industry.focus}</p>
            <button className='card-white-popup-btn button-size' onClick={replaceContent}> Let's Apply </button>
          </div>
          <div className="back-content backHiddenText" ref={backTextRef} style={{ display: !showMainText ? 'flex' : 'none' }}>
            <h2>{industry.name}</h2>
            <NavLink to='/job-seekers/job-application'>Looking for a job?</NavLink>
            <h4 >OR</h4>
            <NavLink to='/employers/employees-required'>Looking for candidates?</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryCard;

