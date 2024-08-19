import React from 'react';
import './pages.css';
import ContactForm from './HomeLists/ContactForm';
import JobSeekerForm from './HomeLists/JobSeekersForm';
import EmployersForm from './HomeLists/EmployersForm';
import { Link, useParams} from 'react-router-dom';


const Dashboard = () => {
  const {userName} = useParams();
  return (
    <div className='page-size wd-100'>
      <h1 className='capatalizedStyle colorRed welcome-head'>Welcome {userName}</h1>
      <div className='listBoxes'>
        <ContactForm />
        <JobSeekerForm />
        <EmployersForm />
      </div>
      <h3 className='btn-to-view-listed-jobs'><Link to={'/jobs-listing'}>To View Listed Jobs</Link></h3>
    </div>
  );
};

export default Dashboard;
