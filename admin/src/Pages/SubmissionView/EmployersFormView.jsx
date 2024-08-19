import { getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../firebase';  // Ensure firestore is correctly imported
import '../pages.css'
const EmployersFormView = () => {
    const [prevPage, setPreviousPage] = useState('')
    const { unique_id } = useParams();
    console.log('Form ID:', unique_id);  // Add this line to debug unique_id
    const [targetDoc, setTargetDoc] = useState(null);

    useEffect(() => {
        if (unique_id && firestore) {
            const gettingFormData = async () => {
                try {
                    const formDocRef = doc(firestore, 'EmployersForm', unique_id);
                    const formDoc = await getDoc(formDocRef);
                    if (formDoc.exists()) {
                        setTargetDoc((prev) =>({
                            ...formDoc.data(),
                            newStatus: false,
                        }));
                        await updateDoc(formDocRef, {...formDoc.data(), newStatus: false});
                    } else {
                        console.log('No Data Found for ID:', unique_id);
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
    }, [unique_id]);

    console.log(targetDoc);
    const deleteSubmission = async () => {
        try {
            const formDocRef = doc(firestore, 'EmployersForm', unique_id);
            await deleteDoc(formDocRef);
            console.log('===> ', document.referrer);
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
                <h4><span className='detail-head'>Company Name:</span> {targetDoc.businessName}</h4>
                <h4><span className='detail-head'>Applicant's Name:</span> {targetDoc.firstName} {targetDoc.lastName}</h4>
                <h4><span className='detail-head'>Applicant's Designation:</span> {targetDoc.position}</h4>
                <h4><span className='detail-head'>E-Mail:</span> {targetDoc.email}</h4>
                <h4><span className='detail-head'>Contact Number:</span> {targetDoc.phone}</h4>
                <h4><span className='detail-head'>Position Required:</span> {targetDoc.postingRequired}</h4>
                <h4><span className='detail-head'>Position Type:</span> {targetDoc.postingType}</h4>
                <h4><span className='detail-head'>City:</span> {targetDoc.city}</h4>
                <h4><span className='detail-head'>State:</span> {targetDoc.state}</h4>
                <h4><span className='detail-head'>Message:</span> {targetDoc.message}</h4>
                <h4><span className='detail-head'>Submission Time:</span> {targetDoc.requestTime}</h4>
                <h4><span className='detail-head'>Submission Date:</span> {targetDoc.requestDate}</h4>

            </div>
            <button className='delete-call-btn' onClick={deleteSubmission}>To Delete Submission</button>
        </div>
    );
};

export default EmployersFormView;
