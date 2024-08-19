import React, { useEffect, useState } from 'react';
import '../pages.css';
import { firestore } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const JobSeekerListPage = () => {
    const [jsFormData, setJSFormData] = useState([]);
  const fetchData = async () => {
    const jsFormSubmissions = await getDocs(collection(firestore, 'JobSeekersForm'));
    const submissionArray = jsFormSubmissions.docs.map(doc => ({ UniqueId: doc.id, ...doc.data() }));

    submissionArray.sort((a, b) => {
      return b.UniqueId - a.UniqueId;
    });
    setJSFormData(submissionArray);
  };
  useEffect(() => {
    

    fetchData();

    const timeInterval = setInterval(fetchData, 10000);
    return () => clearInterval(timeInterval)

  }, []);

  return (
    <>
        <div className='listPage'>
        <h3 className='listPageHead underline-head'>Job Seekers Submissions</h3>
        <div className='listTable'>
            <div className='list-head list-page-head'>
                <h3 className='list-page-row-head wd-12'>Date</h3>
                <h3 className='list-page-row-head wd-18'>Applicant Name</h3>
                <h3 className='list-page-row-head wd-18'>Industry</h3>
                <h3 className='list-page-row-head wd-20'>E-Mail</h3>
                <h3 className='list-page-row-head wd-18'>Contact Number</h3>
                <h3 className='list-page-row-head wd-10'>Details</h3>
            </div>
            <div className='list-page-body'>
                {jsFormData.map(submission => (
                    <div key={submission.UniqueId} className={submission.newStatus ? 'colorRed list-line-on-page' : 'list-line-on-page'}>
                        <h3 className='list-page-row-detail wd-12'>{submission.submissionDate}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.firstName} {submission.lastName}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.industry}</h3>
                        <h3 className='list-page-row-detail wd-20'>{submission.email}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.phone}</h3>
                        <h3 className='detail-check-btn view-btn-list-page wd-10'><Link className={submission.newStatus ? 'colorRed' : 'colorBlue'} to={`/jobseeker-form-details/JS_${submission.UniqueId}`}>View </Link></h3>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default JobSeekerListPage