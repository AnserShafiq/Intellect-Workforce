import React, { useEffect, useState } from 'react';
import '../pages.css';
import { firestore } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const EmployersForm = () => {
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
        <div className='listBox'>
        <h3 className='listBoxHead underline-head'>Employees Requirement</h3>
        <div className='listTable'>
            <div className='list-head'>
                <h3 className='row-head wd-35'>Company Name</h3>
                <h3 className='row-head wd-35'>Target Industry</h3>
                <h3 className='row-head wd-20'>Details</h3>
            </div>
            <div className='list-body'>
                {empFormData.slice(0, 10).map(submission => (
                    <div key={submission.unique_id} className={submission.newStatus ? 'colorRed list-line' : 'list-line'}>
                        <h3 className='row-detail wd-35'>{submission.businessName}</h3>
                        <h3 className='row-detail wd-35'>{submission.postingType}</h3>
                        <h3 className='detail-check-btn wd-20'><Link className={submission.newStatus ? 'colorRed' : 'colorBlue'} to={`/employers-form-details/Emp_${submission.unique_id}`}>View </Link></h3>
                    </div>
                ))}
            </div>
            <div className='list-box-border-btn'>
                <Link to='/emp-entries-list'><button className='list-box-btn'>To View All</button></Link>
            </div>
        </div>
      </div>
    </>
  )
}

export default EmployersForm