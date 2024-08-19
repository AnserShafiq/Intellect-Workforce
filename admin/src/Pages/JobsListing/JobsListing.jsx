import React, { useEffect, useState } from 'react';
import '../pages.css';
import '../../style.css'
import { firestore } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const JobsListing = () => {
    const [jobsList, setJobsList] = useState([]);
  const fetchData = async () => {
    const jobsPresentOnDB = await getDocs(collection(firestore, 'JobListings'));
    const submissionArray = jobsPresentOnDB.docs.map(doc => ({ JobID: doc.JobID, ...doc.data() }));

    submissionArray.sort((a, b) => {
      return b.JobID - a.JobID;
    });
    setJobsList(submissionArray);
  };
  useEffect(() => {
    fetchData();
    const timeInterval = setInterval(fetchData, 10000);
    return () => clearInterval(timeInterval)
  }, []);

  const getSubmissionDateOrTime = (timestamp, toReturn) => {
    // if (!timestamp) return '';
    
    const dateObject = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
    const formattedDate = dateObject.toLocaleDateString(); // Format the date
    const formattedTime = dateObject.toLocaleTimeString(); // Format the time
    if(toReturn === 'Date'){
      return formattedDate
    }else if(toReturn ==='Time'){
      return formattedTime
    }
}

  return (
    <>
        <div className='listPage'>
        <h3 className='listPageHead underline-head'>Jobs Listed On Portal</h3>
        <div className='listTable'>
            <div className='list-head list-page-head'>
            <h3 className='list-page-row-head wd-12'>Date</h3>
                <h3 className='list-page-row-head wd-18'>Title</h3>
                <h3 className='list-page-row-head wd-18'>Company</h3>
                <h3 className='list-page-row-head wd-18'>Industry</h3>
                <h3 className='list-page-row-head wd-18'>Type</h3>
                <h3 className='list-page-row-head wd-12'>Shift</h3>
                <h3 className='list-page-row-head wd-10'>Details</h3>
            </div>
            <div className='list-page-body'>
                {jobsList.map(submission => (
                    <div key={submission.JobID} className={submission.newStatus ? 'colorRed list-line-on-page' : 'list-line-on-page'}>
                        <h3 className='list-page-row-detail wd-12'>{getSubmissionDateOrTime(submission.JobAdditionDate, 'Time')}<br/>{getSubmissionDateOrTime(submission.JobAdditionDate, 'Date')} </h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.Title}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.Company}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.Industry}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.Type}</h3>
                        <h3 className='list-page-row-detail wd-12'>{submission.ShiftType}</h3>
                        <h3 className={`detail-check-btn view-btn-list-page wd-10 `} ><Link className={submission.newStatus ? 'colorRed' : 'colorBlue'} to={`/jobs-listing/Listing_${submission.JobID}`}>View </Link></h3>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </> 
  )
}

export default JobsListing