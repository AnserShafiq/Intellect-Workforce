import React, { useState, useEffect } from 'react';
import './ComponentsStyles/forms.css';
import { firestore } from '../firebase.jsx';
// import { addDoc, collection, getDoc, setDoc, doc } from 'firebase/firestore';
import { getDoc, setDoc, doc } from 'firebase/firestore';

const ContactForm = () => {
    // const ContactFormContainer = collection(firestore, 'ContactForm');
    const SubmissionsCount = doc(firestore, 'FormsSubmissions', 'contact-form-count');
    const [submissionStatus, setSubmissionStatus] = useState(false);
    const [contactFormData, setContactFormData] = useState({
        ApplicantName: '',
        EmailAddress: '',
        ContactNumber: '',
        ReasonOfContact: '',
        Message: '',
        Submission_Date: '',
        Submission_Time: '',
        newStatus: true,
        UniqueId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ContactNumber') {
            let newValue = value.replace(/\D/g, '');
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }
            newValue = newValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            setContactFormData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        } else {
            setContactFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timeAndDate = new Date().toLocaleString('en-GB', {
            timeZone: userTimeZone,
            hour12: false,
        });

        const [date, time] = timeAndDate.split(', ');

        setContactFormData((prev) => ({
            ...prev,
            Submission_Date: date,
            Submission_Time: time,
        }));
    }, []);

    const GetSubmissionCount = async () => {
        const countValue = await getDoc(SubmissionsCount);
        let currentCount = 0;
        if (countValue.exists()) {
            currentCount = countValue.data().totalCount;
        }
        currentCount += 1;
        await setDoc(SubmissionsCount, { totalCount: currentCount }, { merge: true });
        return currentCount;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ID = await GetSubmissionCount();
        const newContactFormData = { ...contactFormData, UniqueId: ID };
        try {
            const docId = `ContactForm_${ID}`;
            await setDoc(doc(firestore, 'ContactForm', docId), newContactFormData);
            console.log(newContactFormData);
            setSubmissionStatus(true);

            const sendingMail = await fetch('https://formspree.io/f/mnnavdje',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactFormData)
            });
            if (sendingMail.ok){
                console.log('Contact Form Mail Sent!!!');
                // window.location.reload();
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='contact-form'>
            
            {submissionStatus === false ? (
                <>
                <form className='contact-form-body' onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='ApplicantName'
                    placeholder='Enter your full name'
                    onChange={handleChange}
                    value={contactFormData.ApplicantName}
                    required
                />
                <input
                    type='email'
                    name='EmailAddress'
                    placeholder='Enter your email'
                    onChange={handleChange}
                    value={contactFormData.EmailAddress}
                    required
                />
                <input
                    type='text'
                    name='ContactNumber'
                    placeholder='Enter your contact number'
                    onChange={handleChange}
                    value={contactFormData.ContactNumber}
                    required
                />
                <select
                    id='reason'
                    name='ReasonOfContact'
                    value={contactFormData.ReasonOfContact}
                    onChange={handleChange}
                >
                    <option value="">Reason for contacting us</option>
                    <option value="About Job Options">About Job Options</option>
                    <option value="For Candidates Search">For Candidates Search</option>
                </select>
                <textarea
                    name='Message'
                    placeholder='Enter your message'
                    onChange={handleChange}
                    rows={3}
                    value={contactFormData.Message}
                    required
                />
                <button className='submitBtn' type='submit'>Submit</button>
            </form>
                </>
            ):(
                <div className="thanksDiv">
          <h3 className="thankYouMsg">Thank you for submitting the form.</h3>
        </div>
            )}
            
            
        </div>
    );
};

export default ContactForm;
