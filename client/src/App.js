// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Footer from './Components/Footer';
import Services from './Pages/Services';
import Employers from './Pages/Employers';
import Jobseekers from './Pages/Jobseekers';
import Loading from './Components/Loading';
import EmployersFormPage from './Pages/EmployersFormPage';
import JobSeekersFormPage from './Pages/JobSeekersFormPage';
import Jobs from './Pages/JobsListing/jobs';
import JobApplication from './Pages/JobsListing/JobApplication';
import JobDisplayOnMobile from './Pages/JobsListing/JobDisplayOnMobile';
// import UnderConstructionMsg from './UnderConstructionMsg';

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000 for 2 seconds

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Routes>
          {/* <Route path='/' element={<UnderConstructionMsg />} /> */}
            <Route path='/' element={<Home />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/job-seekers' element={<Jobseekers />} />
            <Route path='/job-seekers/job-application' element={<JobSeekersFormPage />} /> 
            <Route path='/job-board' element={<Jobs/>} />
            <Route path='/job-board/job/display/:JobID/' element={<JobDisplayOnMobile/>} />
            <Route path='/job-board/job/:JobID/' element={<JobApplication />}/>
            <Route path='/employers' element={<Employers />} />
            <Route path='/employers/employees-required' element={<EmployersFormPage />} />
            <Route path='/our-services' element={<Services />} />
            <Route path='/contact-us' element={<ContactUs />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
