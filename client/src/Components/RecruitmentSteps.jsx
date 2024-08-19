import React from 'react'
import './ComponentsStyles/recruitmentSteps.css'
import './ComponentsStyles/componentsStyle.css'
import { useLocation } from 'react-router-dom'

const RecruitmentSteps = () => {
  const location = useLocation();
  const currentPage = location.pathname;
  
    const stepsList = [
        {
          StepName: 'Focused Analysis',
          Description: 'We invest in comprehending our client’s culture and the team dynamics pertinent to your new role. Our approach includes consulting with the hiring manager to assess the technical environment and position requirements.'
        },
        {
          StepName: 'Honest Consultations',
          Description: 'When you qualify for a job offer, we will schedule a meeting to review whether the opportunity suits your technical capabilities, career level, interests, compensation requirements, and location preferences.'
        },
        {
          StepName: 'Capability Evaluation',
          Description: 'You will be required to complete a skills matrix template developed with the client’s hiring manager. This will be complemented by evaluations during multiple technical interviews.'
        },
        {
          StepName: 'Seamless Integration Review',
          Description: 'A face-to-face behavioral assessment will be held to ensure your compatibility with the team dynamics of our partnering organization.'
        },
        {
          StepName: 'Confidence Building',
          Description: 'No need to worry about self-promotion; we believe in your capabilities. Our support will center on helping you confidently relate your skills to our client’s business requirements.'
        },
      ]
    
  console.log(currentPage);
  if(currentPage === '/employers')
  {
    return (
    <div className='container-size rs-section-4'>
        <h1 className='capatalizedStyle colorBlue'>Our Recruitment Process</h1>
        <div className='steps-division'>

          {stepsList.map((step,index)=>(
            <div className='step-card' key={index}>
              <h2 className='step-number'>Step {index+1}</h2>
              <h4 className='step-name'>{step.StepName}</h4>
              <h5 className='step-description'>{step.Description}</h5>
            </div>  
          ))}
        </div>
      </div>
    )
  }
  if(currentPage === '/job-seekers')
  {
    return(
      <div className='container-size rs-section-4'>
        <h1 className='capatalizedStyle colorBlue'>Our Recruitment Process</h1>
        <div className='steps-division'>

          {stepsList.map((step,index)=>(
            <div className='step-card-js' key={index}>
              <h2 className='step-number'>Step {index+1}</h2>
              <h4 className='step-name'>{step.StepName}</h4>
              <h5 className='step-description'>{step.Description}</h5>
            </div>  
          ))}
        </div>
      </div>

    )
  }
}

export default RecruitmentSteps