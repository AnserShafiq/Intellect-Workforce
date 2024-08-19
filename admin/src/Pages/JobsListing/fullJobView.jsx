import { getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase';  // Ensure firestore is correctly imported
import '../pages.css';
import './js_style.css';

const FullJobView = () => {
    const [prevPage, setPreviousPage] = useState('');
    const { JobID } = useParams();
    console.log('Form ID:', JobID);  // Add this line to debug JobID
    const [targetDoc, setTargetDoc] = useState(null);

    useEffect(() => {
        if (JobID && firestore) {
            const gettingFormData = async () => {
                try {
                    const formDocRef = doc(firestore, 'JobListings', JobID);
                    const formDoc = await getDoc(formDocRef);
                    if (formDoc.exists()) {
                        setTargetDoc({
                            ...formDoc.data(),
                        });
                        await updateDoc(formDocRef, {...formDoc.data(), newStatus: false});
                    } else {
                        console.log('No Data Found for ID:', JobID);
                    }
                } catch (error) {
                    console.error('Error fetching document:', error);
                }
            };
            gettingFormData();
        } else {
            console.error('Invalid Firestore instance or Form ID');
        }
        const previousPage = localStorage.getItem('userName');
        setPreviousPage(previousPage);
    }, [JobID]);

    console.log(targetDoc);
    const deleteJob = async () => {
        try {
            const formDocRef = doc(firestore, 'JobListings', JobID);
            await deleteDoc(formDocRef);
            console.log('Document deleted successfully');
            window.location.href = `/${prevPage}`;
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

const hideOrdisplayJob = async() =>{
    const formDocRef = doc(firestore, 'JobListings', `Listing_${targetDoc.JobID}`);
    try {
        const formDoc = await getDoc(formDocRef);
        if (formDoc.exists()) {
            await updateDoc(formDocRef, { Display: !formDoc.data().Display });
            console.log('Document updated successfully');
        } else {
            console.log('No such document!');
        }
        } catch (error) {
        console.error('Error updating document:', error);
        }
        window.location.reload();
    }

    if (!targetDoc) {
        return <div>Loading...</div>;
    }
    const applications = targetDoc.Applications || [];

    return (
        <div className='page-size single-form-page'>
            <h2 className='details-call-line underline-head'>Following are the Job details:</h2>
            <div className='details-section'>
                <h4 ><span className='detail-head'>Job Title:</span> {targetDoc.Title}</h4>
                <h4 ><span className='detail-head'>Company:</span> {targetDoc.Company} {targetDoc.lastName}</h4>
                <h4 ><span className='detail-head'>Industry:</span> {targetDoc.Industry}</h4>
                <h4 ><span className='detail-head'>Placement Type:</span> {targetDoc.Type}</h4>
                <h4 ><span className='detail-head'>Location:</span> {targetDoc.Location}</h4>
                <h4 ><span className='detail-head'>Responsibilities:</span>
                    <ul className='details-list-box'>
                        {targetDoc.KeyResponsibilities.map((element, index) => (
                            <li key={index} style={{lineHeight: 1.4+'rem', }} >{element}</li>
                        ))}
                    </ul>
                </h4>
                <h4 ><span className='detail-head'>Skills:</span>
                    <ul className='details-list-box'>
                        {targetDoc.NecessarySkills.map((element, index) => (
                            <li key={index} style={{lineHeight: 1.4+'rem', }}>{element}</li>
                        ))}
                    </ul>
                </h4>
                
                <h4 ><span className='detail-head'>Description:</span> {targetDoc.Description}</h4>

                <div className='applicants-list'>
                    <h3 className='applicants-list-head underline-head'>Applicants for this job</h3>
                    <div className='applicants-list-body'>
                        <div className='applicants-list-subhead list-page-head'>
                            <h3 className='applicants-row-head wd-18'>Applicant <br />Name</h3>
                            <h3 className='applicants-row-head wd-18'>Email</h3>
                            <h3 className='applicants-row-head wd-18'>Phone</h3>
                            <h3 className='applicants-row-head wd-18'>Experience<br /> Type</h3>
                            <h3 className='applicants-row-head wd-18'>Years Of<br /> Experience</h3>
                            <h3 className='applicants-row-head wd-18'>Resume</h3>
                        </div>
                        {applications.length <= 1 ? (
                            <div className='list-line-on-page'>
                                <h3 className='applicants-row-detail wd-100' style={{textAlign:'center'}}>No Applicant</h3>
                            </div>
                        ) : (
                            applications.map((applicant, index) => 
                                index > 0 ? (
                                    <div key={index} className={applicant.seenStatus ? 'colorRed list-line-on-page' : 'list-line-on-page'}>
                                    <h3 className='applicants-row-detail wd-18'>{`${index}. ${applicant.ApplicantName}`}</h3>
                                    <h3 className='applicants-row-detail wd-18'>{applicant.Email}</h3>
                                    <h3 className='applicants-row-detail wd-18'>{applicant.Phone}</h3>
                                    <h3 className='applicants-row-detail wd-18'>{applicant.ExperienceType}</h3>
                                    <h3 className='applicants-row-detail wd-18'>{applicant.YearsOfExperience}</h3>
                                    <h3 className='applicants-row-detail wd-18'><a href={applicant.Resume} target="_blank" rel='noreferrer'>Open</a></h3>
                                    </div>
                                ):(null)
                                
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='btns-display'>
            <button className='delete-call-btn' onClick={deleteJob}>To Delete Job</button>
            {targetDoc.Display === true ? (
                <button className='delete-call-btn' onClick={hideOrdisplayJob}>Hide Job</button>
            ):( 
                <button className='delete-call-btn' onClick={hideOrdisplayJob}>Display Job</button>
            )}
            </div>
            
            
        </div>
    );
};

export default FullJobView;
