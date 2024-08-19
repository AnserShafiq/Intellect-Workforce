import React from 'react'
import { MdHealthAndSafety, MdOutlineDeveloperMode, MdOutlineSwitchAccount} from "react-icons/md";
import { BiRightArrowAlt as RightArrow} from "react-icons/bi";
import './ComponentsStyles/industries.css'
import { Link } from 'react-router-dom';
const IndustriesBox = () => {
  return (
    <div className='container-size industries-section'>
        <div className='wd-65' >
          <h1 className='capatalizedStyle colorBlue'>Industries We Serve</h1>
          <h4 className='normalTextStyle colorBlack'>At Intellect Workforce, our recruitment expertise spans a variety of industries, each with distinct requirements and challenges. We specialize in the following sectors:</h4>
        </div>
        <div className='wd-35 hideOnMobile positionDown '>
          <Link to='/our-services' className='toViewBtn'>To View All <RightArrow className='arrowIcon'/></Link>
        </div>
        <div className='wd-100 industries'>
        <div className='wd-30'>
              <div className='industryCard'>
                <MdOutlineDeveloperMode className='industryIcon'/>
                <h3 className='colorRed industryCardHead' >Information Tech</h3>
                <h5 className='cardTextStyle colorBlack'><b style={{color: 'var(--blue-font-color)'}}>Roles Covered:</b> Software developers, IT support, cybersecurity experts.</h5>
                <h5 className='cardTextStyle colorBlack'><b style={{color: 'var(--blue-font-color)'}}>Focus:</b> Keeping up with rapid technological advancements and ensuring candidates have current skills.</h5>
              </div>
          </div>
          <div className='wd-30'>
              <div className='industryCard'>
                <MdHealthAndSafety className='industryIcon'/>
                <h3 className='colorRed industryCardHead' >Healthcare</h3>
                <h5 className='cardTextStyle colorBlack'><b style={{color: 'var(--blue-font-color)'}}>Roles Covered:</b> Nurses, administrative staff, specialized medical professionals.</h5>
                <h5 className='cardTextStyle colorBlack'><b style={{color: 'var(--blue-font-color)'}}>Focus:</b> Prioritizing candidates with the right certifications and a commitment to patient care.</h5>
              </div>
          </div>
        <div className='wd-30'>
        <div className='industryCard'>
                <MdOutlineSwitchAccount className='industryIcon'/>
                <h3 className='colorRed industryCardHead' >Finance</h3>
                <h5 className='cardTextStyle colorBlack'><b style={{color: 'var(--blue-font-color)'}}>Roles Covered:</b> Accountants, financial analysts, compliance officers.</h5>
                <h5 className='cardTextStyle colorBlack'><b style={{color: 'var(--blue-font-color)'}}>Focus:</b> Understanding regulatory frameworks and finding candidates who can navigate complex financial landscapes.</h5>
              </div>
          </div>

          
          <div className='wd-30 hideOnDesktop'>
            <a href='/' className='toViewBtn'>To View All <RightArrow className='arrowIcon'/></a>
          </div>
        </div>

      
      </div>
  )
}

export default IndustriesBox