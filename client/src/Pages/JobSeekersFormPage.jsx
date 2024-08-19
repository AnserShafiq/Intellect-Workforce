import React from 'react'
import './Styles/commonStyle.css'
import './Styles/formPages.css'
import JsForm from '../Components/JsForm'


const JobSeekersFormPage = () => {
  return (
    <>
        <div className='form-page-body display-form-page-head'>
            <h1 className='capatalizedStyle colorBlue '>Job Application</h1>
        </div>
        <div className='form-page-body display-form-page-body'>
            <h4 className='normalTextStyle colorBlackish'>Thank you for your interest in joining one of our roles at Intellect Workforce. <span className='hideOnMobile'>Please provide the required information below and upload a recent copy of your resume for consideration.</span></h4>
            <JsForm />
        </div>
    </>
  )
}

export default JobSeekersFormPage