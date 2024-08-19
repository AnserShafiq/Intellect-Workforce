import React from 'react'
import './Styles/commonStyle.css'
import './Styles/formPages.css'
import EmployerForm from '../Components/EmployerForm'

const EmployersFormPage = () => {
  return (
    <>
        <div className='form-page-body display-form-page-head'>
            <h1 className='capatalizedStyle colorBlue '>Employees <br className='hideOnDesktop'/>Request</h1>
        </div>
        <div className='form-page-body display-form-page-body'>
            <h4 className='normalTextStyle colorBlackish'>Let us know the position you need to fill, and Intellect Workforce will help you find the right fit. <span className='hideOnMobile'>Please complete the form below, and we'll contact you to initiate the recruitment process.</span></h4>
            <EmployerForm />
        </div>
    </>
  )
}

export default EmployersFormPage