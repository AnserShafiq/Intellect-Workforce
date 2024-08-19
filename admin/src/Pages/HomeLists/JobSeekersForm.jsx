import React, { useEffect, useState } from 'react';
import '../pages.css';
import { firestore } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const JobSeekerForm = () => {
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
        <div className='listBox'>
        <h3 className='listBoxHead underline-head'>Job Seekers Submissions</h3>
        <div className='listTable'>
            <div className='list-head'>
                <h3 className='row-head wd-35'>Applicant Name</h3>
                <h3 className='row-head wd-35'>Target Industry</h3>
                <h3 className='row-head wd-20'>Details</h3>
            </div>
            <div className='list-body'>
                {jsFormData.slice(0, 10).map(submission => (
                    <div key={submission.UniqueId} className={submission.newStatus ? 'colorRed list-line' : 'list-line'}>
                        <h3 className='row-detail wd-35'>{submission.firstName} {submission.lastName}</h3>
                        <h3 className='row-detail wd-35'>{submission.industry}</h3>
                        <h3 className='detail-check-btn wd-20'><Link className={submission.newStatus ? 'colorRed' : 'colorBlue'} to={`/jobseeker-form-details/JS_${submission.UniqueId}`}>View </Link></h3>
                    </div>
                ))}
            </div>
            <div className='list-box-border-btn'>
                <Link to='/js-entries-list'><button className='list-box-btn'>To View All</button></Link>
            </div>
        </div>
      </div>
    </>
  )
}

export default JobSeekerForm