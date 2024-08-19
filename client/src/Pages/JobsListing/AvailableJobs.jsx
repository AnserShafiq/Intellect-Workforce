import React, { useEffect, useState } from 'react'
import { firestore } from '../../firebase.jsx';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import './jobs.css';
import { Link, useNavigate } from 'react-router-dom';

const SelectedJob = ({ JobID = '' }) => {
    const [jobDetails, setJobDetails] = useState(null);
    
    useEffect(() => {
        const fetchJobDetails = async () => {
            if (JobID !== '') {
                const jobRef = doc(firestore, 'JobListings', `Listing_${JobID}`);
                const jobSnapshot = await getDoc(jobRef);
                if (jobSnapshot.exists()) {
                    setJobDetails(jobSnapshot.data());
                } else {
                    setJobDetails(null);
                }
            }
        };

        fetchJobDetails();
    }, [JobID]);

    if (JobID === '') {
        return (
            <div>
                <h4>No Job Selected</h4>
            </div>
        );
    } else if (jobDetails) {
        return (
            <div>
                <h3 className='single-job-title'>{jobDetails.Title}</h3>
                <h3 className='single-job-company'>{jobDetails.Company}</h3>
                <h3 className='single-job-body'><span>Industry: </span>{jobDetails.Industry}</h3>
                <h3 className='single-job-body'><span>Placement Type: </span>{jobDetails.Type}</h3>
                <h3 className='single-job-body'><span>Location: </span>{jobDetails.Location}</h3>
                <h3 className='single-job-body'><span>Shift Time: </span>{jobDetails.ShiftType}</h3>
                <button  className='to-apply-btn'><Link to={`/job-board/job/${jobDetails.JobID}`} >Apply Now</Link></button>
                
                <h3 className='single-job-descriptions'><span>Description:</span> <br /> {jobDetails.Description}</h3>
                
                <h3 className='single-job-descriptions'><span>Responsibilities:</span> <br /> 
                    <ul>
                        {jobDetails.KeyResponsibilities && jobDetails.KeyResponsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul></h3>
                
                <h3 className='single-job-descriptions'><span>Requirements:</span> <br /> 
                    <ul>
                        {jobDetails.NecessarySkills && jobDetails.NecessarySkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </h3>
            </div>
        );
    } else {
        return (
            <div>
                <h5>Loading job details...</h5>
            </div>
        );
    }
}

const AvailableJobs = ({ ByTitleDisplay, ByLocationDisplay }) => {
    const [jobs, setJobs] = useState([]);
    const [selectedJobID, setSelectedJobID] = useState('');
    const navigate = useNavigate();

    const fetchJobs = async () => {
        const jobsMap = await getDocs(collection(firestore, 'JobListings'));
        let jobsArray = jobsMap.docs.map(doc => ({ JobID: doc.id, ...doc.data() }));

        if (ByLocationDisplay && ByTitleDisplay) {
            jobsArray = jobsArray.filter(job => (
                job.Title.toLowerCase().includes(ByTitleDisplay.toLowerCase()) &&
                job.Location.toLowerCase().includes(ByLocationDisplay.toLowerCase())
            ));
        }
        jobsArray.sort((a, b) => {
            return b.JobID - a.JobID;
        })
        setJobs(jobsArray);
    }

    const submissionDaysCount = (timestamp) => {
        const jobDate = timestamp.toDate();
        const currentDate = new Date();
        const timeDifference = currentDate - jobDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            return 'Newly got added';
        } else if (daysDifference === 1) {
            return `${daysDifference} day ago`;
        } else {
            return `${daysDifference} days ago`;
        }
    }

    const handleClick = (jobID) => {
        setSelectedJobID(jobID);
        console.log('Clicked', jobID);
        console.log(window.innerWidth);
    }

    useEffect(() => {
        fetchJobs();
        const reloadInterval = setInterval(fetchJobs, 60000);
        return () => clearInterval(reloadInterval);
    });

    return (
        <div className='jobs-listing-table'>
            <div className='job-list-display'>
                {jobs.length > 0 ? (
                    jobs.map(job => (
                        job.Display ? (
                            <div key={job.JobID} className='job-option-div' onClick={() => {
                                window.innerWidth > 1000 ? (
                                    handleClick(job.JobID)
                                ):(
                                    navigate(`/job-board/job/display/${job.JobID}/`)
                                )
                            }}>
                                <h3 className='title-job-box'>{job.Title}</h3>
                                <h3 className='body-job-box'>{job.Company}</h3>
                                <h3 className='body-job-box'>{job.Location}</h3>
                                <h3 className='body-job-box'>{submissionDaysCount(job.JobAdditionDate)}</h3>
                            </div>
                        ) : null
                    ))
                ) : (
                    <p>No jobs found matching the criteria.</p>
                )}
            </div>
            <div className='selected-job-display'>
                
                {window.innerWidth >1000 ? (
                    <SelectedJob JobID={selectedJobID} />
                ):(
                    null
                )}
            </div>
        </div>
    )
}

export default AvailableJobs;
