import './style.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Layout from './Layout';
import ContactFormView from './Pages/SubmissionView/ContactFormView.jsx';
import EmployersFormView from './Pages/SubmissionView/EmployersFormView.jsx';
import JsFormView from './Pages/SubmissionView/JsFormView.jsx';
import ContactFormListPage from './Pages/FullListView/ContactForm.jsx';
import JobSeekerListPage from './Pages/FullListView/JobSeekers.jsx';
import EmployersEntriesList from './Pages/FullListView/Employers.jsx';
import AdminHome from './Pages/AdminHome.jsx';
import CreateNewUser from './Pages/AdminProfile/CreateNewUser.jsx';
import Loading from './Components/loading.jsx';
import AddJob from './Pages/JobsListing/additionForm.jsx';
import JobsListing from './Pages/JobsListing/JobsListing.jsx';
import FullJobView from './Pages/JobsListing/fullJobView.jsx';


const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Set to 10000 for 10 seconds

    return () => clearTimeout(timer);
  }, [location]);

  
  return (
    <>
      {
        loading ? (
          <Loading />
        ):(
          <Routes>
            <Route path='/' element={<AdminHome />} />
            <Route path='/:userName' element={<Dashboard />}/>
            <Route path='/new-admin-creation' element={<CreateNewUser />} />

            <Route path='/contact-details/:UniqueId' element={<ContactFormView/>} />
            <Route path='/cf-entries-list' element={<ContactFormListPage/>} />
            
            <Route path='/employers-form-details/:unique_id' element={<EmployersFormView/>} />
            <Route path='/emp-entries-list' element={<EmployersEntriesList/>} />
            
            <Route path='/jobseeker-form-details/:UniqueId' element={<JsFormView/>} />
            <Route path='/js-entries-list' element={<JobSeekerListPage/>} />

            <Route path='/jobs-listing' element={<JobsListing />} />
            <Route path='/adding-new-job-listing' element={<AddJob />}/>
            <Route path='/jobs-listing/:JobID' element={<FullJobView />}/>
          </Routes>
        )
      }
    </>
  );
}

const AppWrapper = () =>(
  <Router>
    <Layout>
      <App/>
    </Layout>
  </Router>
)

export default AppWrapper;
