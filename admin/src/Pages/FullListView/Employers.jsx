import React, { useEffect, useState } from 'react';
import '../pages.css';
import '../../style.css'
import { firestore } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const EmployersEntriesList = () => {
    const [empFormData, setEmployersFormData] = useState([]);
  const fetchData = async () => {
    const empFormSubmissions = await getDocs(collection(firestore, 'EmployersForm'));
    const submissionArray = empFormSubmissions.docs.map(doc => ({ unique_id: doc.id, ...doc.data() }));

    submissionArray.sort((a, b) => {
      return b.unique_id - a.unique_id;
    });
    setEmployersFormData(submissionArray);
  };
  useEffect(() => {
    fetchData();
    const timeInterval = setInterval(fetchData, 10000);
    return () => clearInterval(timeInterval)
  }, []);

  return (
    <>
        <div className='listPage'>
        <h3 className='listPageHead underline-head'>Employees Requirement</h3>
        <div className='listTable'>
            <div className='list-head list-page-head'>
              <h3 className='list-page-row-head wd-12'>Date</h3>
                <h3 className='list-page-row-head wd-18'>Company Name</h3>
                <h3 className='list-page-row-head wd-18'>Required Position</h3>
                <h3 className='list-page-row-head wd-18'>Target Industry</h3>
                <h3 className='list-page-row-head wd-20'>E-Mail</h3>
                <h3 className='list-page-row-head wd-10'>Details</h3>
            </div>
            <div className='list-page-body'>
                {empFormData.map(submission => (
                    <div key={submission.unique_id} className={submission.newStatus ? 'colorRed list-line-on-page' : 'list-line-on-page'}>
                        <h3 className='list-page-row-detail wd-12'>{submission.requestDate}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.businessName}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.postingRequired}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.postingType}</h3>
                        <h3 className='list-page-row-detail wd-20'>{submission.email}</h3>
                        <h3 className={`detail-check-btn view-btn-list-page wd-10 `} ><Link className={submission.newStatus ? 'colorRed' : 'colorBlue'} to={`/employers-form-details/Emp_${submission.unique_id}`}>View </Link></h3>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </>
  )
}

export default EmployersEntriesList