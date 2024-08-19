import React from 'react'
import Logo from './Images/logo.png';
import './Pages/Styles/commonStyle.css'
const UnderConstructionMsg = () => {
  return (
    <div className='underConstructionPage'>
        <img src={Logo} alt='Website Logo'/>
        <h2 className='capatalizedStyle colorRed'>Website is under construction</h2>
        <h4 className='normalText colorBlue'>Will be back soon !!!</h4>
    </div>
  )
}

export default UnderConstructionMsg