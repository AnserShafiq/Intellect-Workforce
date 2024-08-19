import React from 'react'
import './Styles/commonStyle.css'
import './Styles/jobseekers.css'
import Icon1 from '../Images/Jobseekers/icon-1.png';
import Icon2 from '../Images/Jobseekers/icon-2.png';
import RecruitmentSteps from '../Components/RecruitmentSteps';
import { Link } from 'react-router-dom';

const Jobseekers = () => {
  return (
    <>
    {/* Section 1 */}
      <div className='container-size subPagesHead js-section-1'>
        <div className='subPageHead-content'>
          <h1 className='capatalizedStyle colorWhite'>Empowering Your Career Journey with Intellect and Opportunity</h1>
          <h4 className='normalTextStyle colorWhite'>We connect you with employers who recognize and appreciate your unique skills and experience, ensuring that you find positions where your talents are truly valued.
          <span className='hideOnMobile'>Our goal is to support your growth and development by providing opportunities that are not only fulfilling but also aligned with your passion and expertise.</span>
          </h4>
          <Link style={{textDecoration:'none'}} to='/job-seekers/job-application'><h3 className='contract-btn'>Let's Explore Career</h3></Link>
        </div>
      </div>
      {/* Section 2 */}
      <div className='container-size js-section-2'>
        <div className=' centered-text'>
          <h1 className='capatalizedStyle colorBlue'> Benefits we provides </h1>
          <h4 className='normalTextStyle colorBlackish'>Partnering with Intellect Workforce as a job seeker provides you with a range of <br className='hideOnMobile'/>valuable benefits designed to enhance your career journey</h4>
        </div>
          <div className='js-section2-inner'>
            <img src={Icon1} className='inner-section-img' alt='Personalized Support'/>
            <h3 className='benefits-card-name'>Personalized Support</h3>
            <h4 className='benefits-card-desc'>At Intellect Workforce, we prioritize understanding your individual career goals and aspirations. Our dedicated team works closely with you to tailor our support and guidance to your unique needs, ensuring a customized approach that aligns with your professional objectives.</h4>
          </div>
          <div className='js-section2-inner'>
            <img src={Icon2} className='inner-section-img' alt='Access to exclusive opportunities'/>
            <h3 className='benefits-card-name'>Access to exclusive opportunities</h3>
            <h4 className='benefits-card-desc'>We leverage our extensive network and industry connections to provide you with access to roles that are not publicly advertised. By partnering with us, you gain entry to a selection of exclusive job opportunities that can significantly advance your career & open doors to new positions.</h4>
          </div>
      </div>
      {/* Section 3 */}
      <div className='container-size js-section-3' >
        <h1 className='capatalizedStyle colorWhite'>Discover Top-Tier Opportunities  <br className='hideOnMobile'/><span className='colorRed'>With Our Personalized </span><br className='hideOnMobile'/>Career Insights</h1>
      </div>
      {/* Section 4 */}
      <RecruitmentSteps />
      {/* Section 5 */}
      <div className='container-size js-section-5'>
        <div className='textSection'>
          <h2 className='capatalizedStyle colorWhite'>Unlock the best career options through our tailored recruitment approach</h2>
          <Link to='/job-seekers/job-application' className='exploreBtn'>Let's Get Highlight</Link>
        </div>
      </div>
    </>
  )
}

export default Jobseekers