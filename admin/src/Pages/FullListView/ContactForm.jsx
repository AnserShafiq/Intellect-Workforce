import React, { useEffect, useState } from 'react';
import '../pages.css';
import { firestore } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const ContactFormListPage = () => {
    const [contactFormData, setContactFormData] = useState([]);
    const fetchData = async () => {
    const contactFormSubmissions = await getDocs(collection(firestore, 'ContactForm'));
    const submissionArray = contactFormSubmissions.docs.map(doc => ({ UniqueId: doc.id, ...doc.data() }));

    submissionArray.sort((a, b) => {
      return b.UniqueId - a.UniqueId;
    });
    setContactFormData(submissionArray);
  };
  useEffect(() => {
    

    fetchData();

    const timeInterval = setInterval(fetchData, 10000);
    return () => clearInterval(timeInterval)

  }, []);

  return (
    <>
    {contactFormData.length === 0? (console.log('Array empty')):(console.log('Array Not Empty'))}
        <div className='listPage'>
        <h3 className='listPageHead underline-head'>Contact Form Submissions</h3>
        <div className='listTable'>
            <div className='list-head list-page-head'>
                <h3 className='list-page-row-head wd-12'>Date</h3>
                <h3 className='list-page-row-head wd-18'>Applicant Name</h3>
                <h3 className='list-page-row-head wd-18'>Contact Number</h3>
                <h3 className='list-page-row-head wd-20'>E-Mail</h3>
                <h3 className='list-page-row-head wd-18'>Reason</h3>
                <h3 className='list-page-row-head wd-10'>Details</h3>
            </div>
            <div className='list-page-body'>
                {contactFormData.length === 0 ? (
                  <>
                    <h4>Nothing to show</h4>
                  </>
                ):(
                  <>
                  {contactFormData.map(submission => (
                    <div key={submission.UniqueId} className={submission.newStatus ? 'colorRed list-line-on-page' : 'list-line-on-page'}>
                        <h3 className='list-page-row-detail wd-12'>{submission.Submission_Date}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.ApplicantName}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.ContactNumber}</h3>
                        <h3 className='list-page-row-detail wd-20'>{submission.EmailAddress}</h3>
                        <h3 className='list-page-row-detail wd-18'>{submission.ReasonOfContact}</h3>
                        <h3 className='detail-check-btn view-btn-list-page wd-10'><Link className={submission.newStatus ? 'colorRed' : 'colorBlue'} to={`/contact-details/ContactForm_${submission.UniqueId}`}>View </Link></h3>
                    </div>
                ))}
                  </>
                )}
            </div>
        </div>
      </div>
    </>
  )
}

export default ContactFormListPage