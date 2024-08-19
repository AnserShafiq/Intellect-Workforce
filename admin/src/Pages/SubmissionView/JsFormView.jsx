import { getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase';  // Ensure firestore is correctly imported
import '../pages.css'
const JsFormView = () => {
    const [prevPage, setPreviousPage] = useState(null)
    const { UniqueId } = useParams();
    console.log('Form ID:', UniqueId);  // Add this line to debug UniqueId
    const [targetDoc, setTargetDoc] = useState(null);

    useEffect(() => {
        if (UniqueId && firestore) {
            const gettingFormData = async () => {
                try {
                    const formDocRef = doc(firestore, 'JobSeekersForm', UniqueId);
                    const formDoc = await getDoc(formDocRef);
                    if (formDoc.exists()) {
                        setTargetDoc(formDoc.data());
                        await updateDoc(formDocRef,{...formDoc.data(), newStatus: false} );
                    } else {
                        console.log('No Data Found for ID:', UniqueId);
                    }
                } catch (error) {
                    console.error('Error fetching document:', error);
                }
            };
            gettingFormData();
        } else {
            console.error('Invalid Firestore instance or Form ID');
        }
        const previousPage= localStorage.getItem('userName');
        setPreviousPage(previousPage);
    }, [UniqueId]);
    const deleteSubmission = async () => {
        try {
            const formDocRef = doc(firestore, 'JobSeekersForm', UniqueId);
            await deleteDoc(formDocRef);
            console.log('Document deleted successfully');
            window.location.href = `/${prevPage}`;
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };
    

    if (!targetDoc) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <div className='page-size single-form-page'>
            <h2 className='details-call-line underline-head '>Following are the form details:</h2>
            <div className='details-section'>
                <h4><span className='detail-head'>Full Name:</span> {targetDoc.firstName} {targetDoc.lastName}</h4>
                <h4><span className='detail-head'>E-Mail:</span> {targetDoc.email}</h4>
                <h4><span className='detail-head'>Contact Number:</span> {targetDoc.phone}</h4>
                <h4><span className='detail-head'>Major Experience:</span> {targetDoc.majorExperience}</h4>
                <h4><span className='detail-head'>Target Industry:</span> {targetDoc.industry}</h4>
                <h4><span className='detail-head'>Resume:</span> <a target='_blank' rel="noopener noreferrer" href={targetDoc.resume}>Open</a></h4>
                <h4><span className='detail-head'>Submission Time:</span> {targetDoc.submissionTime}</h4>
                <h4><span className='detail-head'>Submission Date:</span> {targetDoc.submissionDate}</h4>

            </div>
            <button className='delete-call-btn' onClick={deleteSubmission}>To Delete Submission</button>
        </div>
    );
};

export default JsFormView;
