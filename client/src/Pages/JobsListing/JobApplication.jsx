import React, { useEffect, useState } from 'react';
import './jobs.css';
import { useParams } from 'react-router-dom';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const handleUpload = async (file) => {
    try {
      const fileRef = ref(storage, `resumes/${file.name}`);
      await uploadBytes(fileRef, file);
  
      // Getting url of uploaded file
      const fileURL = await getDownloadURL(fileRef);
      console.log('File uploaded successfully:', fileURL);
      return fileURL;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

const JobApplication = () => {
    const [submissionStatus, setSubmissionStatus] = useState(false); 
    const { JobID } = useParams();
    const [jobSelected, setJobSelected] = useState({});
    const [error, setError] = useState('');
    const [newApplicant, setNewApplicant] = useState({
        ApplicantName: '',
        Email: '',
        ExperienceType: '',
        Phone: '',
        Resume: null,
        SubmissionTime_Date: '',
        YearsOfExperience: '',
        seenStatus: false,
    });

    useEffect(() => {
        const fetchDetails = async () => {
            const JobAccess = doc(firestore, 'JobListings', `Listing_${JobID}`);
            const jobData = await getDoc(JobAccess);
            if (jobData.exists()) {
                setJobSelected(jobData.data());
            }
        };
        fetchDetails();
    }, [JobID]); // Add JobID as a dependency

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'Phone') {
            let formattedPhone = value.replace(/\D/g, '');
            if (formattedPhone.length > 10) {
                formattedPhone = formattedPhone.slice(0, 10);
            }
            formattedPhone = formattedPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3');
            setNewApplicant((prev) => ({
                ...prev,
                [name]: formattedPhone,
            }));
        } else if (name === 'Resume') {
            const allowedTypes = [
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain',
                'application/pdf',
            ];

            const file = files[0];

            if (file && allowedTypes.includes(file.type)) {
                setNewApplicant((prev) => ({
                    ...prev,
                    [name]: file,
                }));
                setError('');
            } else {
                setError('Please upload a valid file format: .doc, .docx, .txt, or .pdf');
                e.target.value = null;
            }
        } else {
            setNewApplicant((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleSubmission = async(e) =>{
        e.preventDefault();
        if(!newApplicant.Resume){
            setError('Please upload your resume.');
            return ;
        }
        const convertResumeUrl = await handleUpload(newApplicant.Resume);

        const JobAccess = doc(firestore, 'JobListings', `Listing_${JobID}`);

        try{
            const dataToAdd = {...newApplicant, Resume: convertResumeUrl};
            await updateDoc(JobAccess, {
                Applications: arrayUnion(dataToAdd)
            })
            setSubmissionStatus(true);
        }catch(error){
            console.error(error);
        }
    }

    return (
        <div className='jobs-table'>
            {submissionStatus === true ? (
                <div>
                    <h3>Thank you for applying, we will contact you as soon as possible</h3>
                </div>
            ) : (
                <>
                <div className='jobs-filter-section'>
                <h3 className='job-application-name capatalizedStyle colorRed'>
                    Applying for {jobSelected.Title}
                </h3>
            </div>
            <div className='application-form-container'>
                <form onSubmit={handleSubmission}>
                    <div className='application-form'>
                        <div className='application-form-field'>
                            <label className='input-label'>Full Name</label>
                            <input className='input-entry'
                                type='text'
                                placeholder='Enter your full name'
                                name='ApplicantName'
                                value={newApplicant.ApplicantName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='application-form-field'>
                            <label className='input-label'>Email</label>
                            <input className='input-entry'
                                type='email'
                                placeholder='Enter your email'
                                name='Email'
                                value={newApplicant.Email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='application-form-field'>
                            <label className='input-label'>Contact Number</label>
                            <input className='input-entry'
                                type='tel'
                                placeholder='Enter your contact number'
                                name='Phone'
                                value={newApplicant.Phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='application-form-field'>
                            <label className='input-label'>Experience Type</label>
                            <div className='check-box-container'>
                                <div className='check-box' onClick={() => setNewApplicant(prev => ({...prev, ExperienceType: 'Experienced'}))}>
                                    <input type='radio' name='ExperienceType' value={'Experienced'} checked={newApplicant.ExperienceType === 'Experienced'} onChange = {handleChange} />
                                    Experienced
                                </div>
                                <div className='check-box' onClick={() => setNewApplicant(prev => ({...prev, ExperienceType: 'Freshie'}))}>
                                    <input type='radio' name='ExperienceType' value={'Freshie'} checked={newApplicant.ExperienceType === 'Freshie'} onChange = {handleChange} />
                                    Freshie
                                </div>
                            </div>
                        </div>
                        {
                            (newApplicant.ExperienceType === 'Experienced' ? (
                                <div className='application-form-field'>
                                <label className='input-label'>Years Of Experience</label>
                                <input className='input-entry'
                                    type='number'
                                    placeholder='Count of experienced years'
                                    name='YearsOfExperience'
                                    value={newApplicant.YearsOfExperience}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            ) : (
                                null
                            ))
                        }
                        <div className='application-form-field'>
                            <label className='input-label'>Resume</label>
                            <input className='input-entry'
                                type='file'
                                name='Resume'
                                accept='.doc,.docx,.txt,.pdf'
                                onChange={handleChange}
                                required
                            />
                            {error && <p className='error-message'>{error}</p>}
                        </div>
                    </div>

                    <button type='submit' className='application-submit'>Submit</button>

                </form>
            </div>
                </>
            )}
            
        </div>
    );
};

export default JobApplication;
