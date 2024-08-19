import React from 'react'
import './Styles/commonStyle.css'
import './Styles/employers.css'
import IconOne from '../Images/Employers/needs.png';
import IconTwo from '../Images/Employers/talent.png';
import IconThree from '../Images/Employers/seamless.png';
import RecruitmentSteps from '../Components/RecruitmentSteps';
import { NavLink,Link } from 'react-router-dom';

const Employers = () => {

  return (
    <>
      {/* Section 1 */}
      <div className='container-size subPagesHead employers-section-1'>
        <div className='subPageHead-content'>
        <h1 className='capatalizedStyle colorWhite'>Optimize your business strategies with Intellect Workforce</h1>
        <h4 className='normalTextStyle colorWhite'><span className='hideOnMobile'>With Intellect Workforce, optimize your business strategies for maximum impact. </span>
        We provides insightful analysis & actionable recommendations, enabling you to refine processes and improve outcomes.</h4>
          <Link style={{textDecoration:"none"}} to='/employers/employees-required' ><h3 className='contract-btn'>Let's Elevate Business Together</h3></Link>
        </div>
      </div>
      {/* Section 2 */}
      <div className='container-size employers-section-2'>
        <div className='employers-section2-inner'>
        <div className='emptyDiv'/>
          <div className='emp-card firstCard'>
            <img src={IconOne} alt='specific needs' className='emp-card-icon'/>
            <h3 className='emp-card-name'>Understanding your specific needs</h3>
          </div>
          <div className='emptyDiv'/>
          <div className='emp-card'>
            <img src={IconTwo} alt='specific needs' className='emp-card-icon'/>
            <h3 className='emp-card-name'>Sourcing and screening top talent</h3>
          </div>
          <div className='emp-card'>
            <img src={IconThree} alt='specific needs' className='emp-card-icon'/>
            <h3 className='emp-card-name'>Ensuring a seamless hiring experience</h3>
          </div>
        </div>
        <div className='employers-section2-inner'>
          <h5 className='subHead'>Advantages we offer for your success</h5>
          <h1 className='capatalizedStyle colorBlue'>Seamless Recruitment From Needs Assessment to Onboarding</h1>
          <p className='normalTextStyle colorBlackish'>At Intellect Workforce, we adopt a holistic and meticulous approach to recruitment,
            ensuring we deliver the best candidates for your business. Our process begins with a thorough understanding of your unique requirements, including company culture, job specifics, and long-term goals. We then leverage our extensive network and industry expertise to source and rigorously screen top talent, ensuring only the most qualified candidates are presented.
            <span className='hideOnMobile'> Our dedicated team handles every aspect of the hiring process, providing a seamless experience from initial consultation to onboarding. This comprehensive approach guarantees a smooth transition for both clients and candidates, resulting in successful and lasting employment relationships.</span></p>
        </div>
      </div>
      {/* Section 3 */}
      <div className='container-size employers-section-3' >
        <h1 className='capatalizedStyle colorWhite'>Our focus is on understanding <br className='hideOnMobile'/><span className='colorRed'>your requirements to deliver </span><br className='hideOnMobile'/>exceptional solutions</h1>
      </div>
      {/* Section 4 */}
      <RecruitmentSteps />
      {/* Section 5 */}
      <div className='container-size employers-section-5'>
        <div className='textSection'>
          <h2 className='capatalizedStyle colorWhite'>Elevating your company to the leading edge of excellence & accuracy.</h2>
          <NavLink to='/employers/employees-required' className='exploreBtn'>Let's Hire Talents</NavLink>
        </div>
      </div>
    </>
  )
}

export default Employers