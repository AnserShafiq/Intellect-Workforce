import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase.jsx';
import { getDocs, collection,doc, getDoc, setDoc } from 'firebase/firestore';
// import { Link } from 'react-router-dom';
import './js_style.css';
import '../pages.css';

const AddJob = () => {

    const totalJobsListed = doc(firestore, 'FormsSubmissions', 'jobs-listed');

    const [location, setLocation] = useState({
        city:'',
        state:'',
    })
    const [responsibilities, setResponsibilities] = useState(['']);
    const [requiredSkills, setRequiredSkills] = useState(['']);
    const [jobOption, setJobOption] = useState({
        JobID: 0,
        Title: '',
        Company: '',
        Industry: '',
        Type: '',
        Location: '',
        JobAdditionDate: new Date(),
        ShiftType: '',
        KeyResponsibilities: [],
        NecessarySkills: [],
        Description: '',
        Display: true,
        Applications: [{
            ApplicantName: '',
            Phone: '',
            Email: '',
            ExperienceType: '',
            YearsOfExperience: 0,
            Resume: '',
            SubmissionTime_Date: '',
            seenStatus: false,
        }],
    });

    const fetchData = async () => {
        const jobOptionsList = await getDocs(collection(firestore, 'JobListings'));
        const dataSorting = jobOptionsList.docs.map(doc => doc.data().JobID);
        
        setJobOption(prev => ({
            ...prev,
            JobID: dataSorting.length > 0 ? Math.max(...dataSorting) + 1 : 1, // Setting next JobID
        }));
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleArraysEntry = (index, input, type) => {
        if(type === 'responsibility'){
            const presentArray = [...responsibilities];
            presentArray[index] = input;
            setResponsibilities(presentArray);
        }else if( type === 'skill'){
            const presentArray = [...requiredSkills];
            presentArray[index] = input;
            setRequiredSkills(presentArray);
        }
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobOption(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const GetListCount = async () => {
        const countValue = await getDoc(totalJobsListed);
        let currentCount = 0;
        if (countValue.exists()) {
            currentCount = countValue.data().totalCount;
        }
        currentCount += 1;
        await setDoc(totalJobsListed, { totalCount: currentCount }, { merge: true });
        return currentCount;
    };


    const handleJobSubmission = async(e) => {
        e.preventDefault();

        const jobId= await GetListCount();

        const jobData = {
            ...jobOption,
            JobID: jobId,
            Location: `${location.city}, ${location.state}`,
            KeyResponsibilities: responsibilities,
            NecessarySkills: requiredSkills,
        };

        try{
            const listId = `Listing_${jobId}`;
            await setDoc(doc(firestore, 'JobListings', listId), jobData);
            
        }catch(error){
            console.error(error);
        }

        console.log(jobData);
    };

    return (
        <div className='page-size wd-100 new-list-form'>
                <h1 className='capatalizedStyle colorRed welcome-head underline-head'>Let's Add A New Job Option</h1>
            <div className='formBox'>
                <form onSubmit={handleJobSubmission} className='list-form-body'>
                    <div className='form-body'>
                        {/* Job Name */}
                        <label className='field-name'>Job Title:</label>
                        <input className='entry-field-job' type='text' name='Title' value={jobOption.Title} onChange={handleChange} required/>
                        <label className='field-name'>Company Name:</label>
                        <input className='entry-field-job' type='text' name='Company' value={jobOption.Company} onChange={handleChange} required/>
                        {/* Job Type */}
                        <label className='field-name'>Industry Type:</label>
                        <select
                            name="Industry"
                            value={jobOption.Industry}
                            className='entry-field-job'
                            onChange={handleChange}
                            required
                        >
                            <option value=""></option>
                            <option value="Info Tech">Information Technology</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Finance">Finance</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Retail">Retail</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Construction">Construction</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        {/* Job Type */}
                        <label className='field-name'>Placement Type:</label>
                        <select
                            name="Type"
                            value={jobOption.Type}
                            className='entry-field-job'
                            onChange={handleChange}
                            required
                        >
                            <option value=""></option>
                            <option value="Contract Based">Contract Based</option>
                            <option value="Permanent">Permanent</option>
                        </select>
                        {/* Responsibilities */}
                        
                            <label className='field-name'>Key Responsibilities</label>
                            <div className='entry-line-div'>
                            {
                                responsibilities.map((valueEntered, index) => (
                                    <div key={index} className='array-entry wd-100'>
                                        
                                        <input className='entry-field-job' 
                                            type='text' 
                                            value={valueEntered} 
                                            onChange={(e) => handleArraysEntry(index, e.target.value, 'responsibility')}
                                            required
                                        />
                                    </div>
                                ))
                            }
                            <div className='add-line-btn'>
                            <button type='button' onClick={() => setResponsibilities([...responsibilities, ''])}>
                                Add item
                            </button>
                            </div>

                        </div>
                        {/* Skills */}
                        
                            <label className='field-name'>Skills Required</label>
                            <div className='entry-line-div'>
                            {
                                requiredSkills.map((valueEntered, index) => (
                                    <div key={index} className='array-entry'>
                                        <input className='entry-field-job' 
                                            type='text' 
                                            value={valueEntered} 
                                            onChange={(e) => handleArraysEntry(index, e.target.value,'skill')}
                                            required
                                        />
                                    </div>
                                ))
                            }
                            <div className='add-line-btn'>
                            <button type='button' onClick={() => setRequiredSkills([...requiredSkills, ''])}>
                                Add item
                            </button>
                            </div>
                        </div>
                        {/* Location */}
                        <label className='field-name'>City</label>
                        <input className='entry-field-job' type='text' value={location.city} name='city' onChange={(e) =>{setLocation((prev)=> ({...prev, city: e.target.value}))}} required/>

                        <label className='field-name'>State</label>
                        <select
                            name="state"
                            value={location.state}
                            className='entry-field-job'
                            onChange={(e) => {setLocation((prev)=> ({...prev, state: e.target.value}))}}
                            required
                        >
                            <option value="" style={{color: '#fcfcfc'}}></option>
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="MB">Manitoba</option>
                            <option value="NM">New Brunswick</option>
                            <option value="NL">Newfoundland and Labrador</option>
                            <option value="NS">Nova Scotia</option>
                            <option value="ON">Ontario</option>
                            <option value="PE">Prince Edward Island</option>
                            <option value="QC">Quebec</option>
                            <option value="SK">Saskatchewan</option>
                            <option value="NT">Northwest Territories</option>
                            <option value="NU">Nunavut</option>
                            <option value="YT">Yukon</option>
                        </select>
                        {/* Shift Type */}
                        <label className='field-name'>Shift Type:</label>
                        <select
                            name="shifttype"
                            value={jobOption.ShiftType}
                            className='entry-field-job'
                            onChange={(e) => {setJobOption((prev) => ({...prev, ShiftType: e.target.value}))}}
                            required
                        >
                            <option value=""></option>
                            <option value="Morning">Morning</option>
                            <option value="Evening">Evening</option>
                            <option value="Night">Night</option>
                            <option value="All">All</option>
                        </select>
                        
                        {/* Job Description */}
                        <label className='field-name'>Job Description:</label>
                        <textarea rows={5} className='entry-field-job text-entry' name='Description' value={jobOption.Description} onChange={handleChange} required/>
                    </div>
                    <button type='submit' className='job-submit-btn'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddJob;
