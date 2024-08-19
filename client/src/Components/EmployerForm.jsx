import React, { useState, useEffect } from 'react'
import './ComponentsStyles/componentsStyle.css'
import './ComponentsStyles/forms.css'
import { firestore } from '../firebase';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import emailjs from 'emailjs-com';

emailjs.init('24xfVEuX62S5-USki')


const EmployerForm = () => {
    
    const SubmissionsCount = doc(firestore, 'FormsSubmissions', 'emp-form-count');
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
    const [empForm, setEmpForm] = useState({
        firstName: '',
        lastName: '',
        businessName: '',
        position: '',
        email: '',
        phone:'',
        postingRequired: '',
        postingType: '',
        city:'',
        state:'',
        message: '',
        requestTime: '',
        requestDate:'',
        newStatus: true,
        unique_id: '',
    })
    const [submissionStatus, setSubmissionStatus] = useState(false);
    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const timeAndDate = new Date().toLocaleString('en-GB', { timeZone: userTimeZone, hour12: false });
        const [date, time] = timeAndDate.split(', ');
    
        setEmpForm((prev) => ({
          ...prev,
          requestDate: date,
          requestTime: time,
        }));
      }, []);
    const handleChange = (e) =>{
        const {name,value} = e.target;
        // console.log('=> ',value);
        if(name === 'phone'){
            let forNumberCheck = value.replace(/\D/g,'');
            if(forNumberCheck.length >10){
                forNumberCheck = forNumberCheck.slice(0,10);
            }
            forNumberCheck = forNumberCheck.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3');
            setEmpForm((prev) =>({
                ...prev,
                [name]: forNumberCheck,
            }))
        }
        else{
            setEmpForm((prev) =>({
            ...prev,
            [name]: value,
        }))
        }
    }
    const handleSubmission= async(e)=>{
        e.preventDefault();
        const formId = await GetSubmissionCount();
        const formToUpload = {...empForm, unique_id: formId };
        try{
            const formNumber = `Emp_${formId}`;
            await setDoc(doc(firestore, 'EmployersForm', formNumber), formToUpload);
            setSubmissionStatus(true);
            const dataToMail = {
                    companyName: empForm.businessName,
                    applicantName: `${empForm.firstName} ${empForm.lastName}`,
                    applicantDesignation: empForm.position,
                    email: empForm.email,
                    phoneNumber: empForm.phone,
                    positionRequired: empForm.postingRequired,
                    positionType: empForm.postingType,
                    city: empForm.city,
                    state: empForm.state,
                    message: empForm.message,
              };
        
              emailjs.send('intellect_workforce_34#', 'employers_request_mail', dataToMail, '24xfVEuX62S5-USki')
              .then( (response) =>{
                  console.log('Sucessfully Sent!!', response.status, response.text);
              },(error) => {
                 console.log('Error => ', error);
              }
              ).catch((e) => console.log(e))
            
        }catch(error){
            console.error(console.error);
        }
    }
    return (
        <div className='emp-form'>
            
            {submissionStatus === false ? (
                <>
                <div className='head-comment-div'>
                    <h3 className='head-comment-text'>Please complete the form, and one of our recruiters will be in touch with you soon.</h3>
                </div>
                
                <form onSubmit={handleSubmission} className='form-body'>
                <div className='form-heading'>
                    <h3>General Information</h3>
                </div>
                <div className='form-fields'>
                    {/* First Name */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>First Name:</label>
                        <input className='form-input-field-input' type='text' name='firstName' value={empForm.firstName} onChange={handleChange} required/>
                    </div>
                    {/* Last Name */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>Last Name:</label>
                        <input className='form-input-field-input' type='text' name='lastName' value={empForm.lastName} onChange={handleChange} required/>
                    </div>
                    {/* Business Name */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>Company Name:</label>
                        <input className='form-input-field-input' type='text' name='businessName' value={empForm.businessName} onChange={handleChange} required/>
                    </div>
                    {/* Applicant's job Position */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>Your Designation:</label>
                        <input className='form-input-field-input' type='text' name='position' value={empForm.position} onChange={handleChange} required/>
                    </div>
                    {/* E-Mail */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>E-Mail:</label>
                        <input className='form-input-field-input' type='email' name='email' value={empForm.email} onChange={handleChange} required/>
                    </div>
                    {/* Phone */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>Phone#</label>
                        <input className='form-input-field-input' type='tel' name='phone' value={empForm.phone} onChange={handleChange} required/>
                    </div>
                </div>
                <div className='form-heading'>
                    <h3>Employess Requirement Details</h3>
                </div>
                <div className='form-fields'>
                    {/* Posting Required */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>Required Position:</label>
                        <input className='form-input-field-input' type='text' name='postingRequired' value={empForm.postingRequired} onChange={handleChange} required/>
                    </div>
                    {/* Post type */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>Position Type:</label>
                        <select className='form-input-field-select' name='postingType' value={empForm.postingType} onChange={handleChange}>
                            <option value=''></option>
                            <option value='Info Tech'>Information Technology</option>
                            <option value='Healthcare'>Healthcare</option>
                            <option value='Finance'>Finance</option>
                            <option value='Manufacturing'>Manufacturing</option>
                            <option value='Retail'>Retail</option>
                            <option value='Engineering'>Engineering</option>
                            <option value='Construction'>Construction</option>
                            <option value='Marketing'>Marketing</option>
                        </select>
                    </div>
                    {/* City */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>City:</label>
                        <input className='form-input-field-input' type='text' name='city' value={empForm.city} onChange={handleChange} required/>
                    </div>
                    {/* State */}
                    <div className='form-input-field'>
                        <label className='form-input-field-label'>State:</label>
                        <input className='form-input-field-input' type='text' name='state' value={empForm.state} onChange={handleChange} required/>
                    </div>
                    <div className='form-input-field text-field-area'>
                        <label className='form-input-field-label'>Any Message:</label>
                        <textarea className='form-input-field-input' rows={3} name='message' value={empForm.message} onChange={handleChange} required/>
                    </div>
                </div>
                <button type='submit' className='formSubmitBtn'>Submit</button>
            </form>
            </>
            ):(
                <div className='thanksDiv'>
                    <h3 className='thankYouMsg'>Thank you for submitting, we will contact you back shortly.</h3>
                </div>
            )

            }
            

        </div>
    )
}

export default EmployerForm
