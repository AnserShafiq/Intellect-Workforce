import React, { useEffect, useState } from 'react';
import './jobs.css';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';



const JobDisplayOnMobile = () => {

    const { JobID } = useParams();
    const [jobDetails, setJobSelected] = useState({});

    useEffect(() => {
        const fetchDetails = async () => {
            console.log('===> ', JobID)
            const JobAccess = doc(firestore, 'JobListings', `Listing_${JobID}`);
            const jobData = await getDoc(JobAccess);
            if (jobData.exists()) {
                setJobSelected(jobData.data());
            }
        };
        fetchDetails();
    }, [JobID]);


  return (
    <div className='jobs-table'>
        <div className='jobs-filter-section'>
            <h3 className='job-application-name capatalizedStyle colorRed'>{jobDetails.Title}</h3>    
            <h3 className='normalTextStyle colorRed'>{jobDetails.Company}</h3>
        </div>
        <div className='job-content-section'>
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
        
    </div>
  )
}

export default JobDisplayOnMobile