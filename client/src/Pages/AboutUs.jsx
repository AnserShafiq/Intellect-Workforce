import React from 'react';
import './Styles/commonStyle.css';
import './Styles/aboutus.css';
import Popup from '../Components/Popup';
import Integrity from '../Images/AboutUs/integrity.png';
import Innovation from '../Images/AboutUs/innovation.png';
import Partnership from '../Images/AboutUs/partnership.png';
import Excellence from '../Images/AboutUs/excellence.png';
import Mission from '../Images/AboutUs/our-mission.jpg';
import MissionMobile from '../Images/AboutUs/our-mission-mobile.jpg';
import Vision from '../Images/AboutUs/our-vision.jpg';
import VisionMobile from '../Images/AboutUs/our-vision-mobile.jpg';
import IndustriesBox from '../Components/IndustriesBox';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  return (
    <>
      {/* Section 1 */}
      <div className='container-size subPagesHead about-section-1'>
        <div className='subPageHead-content'>
          <h1 className='capatalizedStyle colorWhite'>Transform your staffing approach with our forward-thinking solutions</h1>
          <h4 className='normalTextStyle colorWhite'>At Intellect Workforce, we are revolutionizing the staffing industry with our innovative solutions and unwavering commitment to both clients and candidates. 
            <span className='hideOnMobile'>With over years of excellence, we have been at the forefront of connecting top-tier talent with leading organizations, fostering mutual growth and success.</span></h4>
          <Popup btnColor='white-popup-btn'  btnType='Normal'>To Link With Us</Popup>
        </div>
      </div>
      {/* Section 2 */}
      <div className='container-size about-section-2'>
        <div className='about-content-2'>
          <img src={Integrity} className='valueIcon' alt='Integrity'/>
          <h2 className='colorRed valueName'>Integrity</h2>
          <h4 className='valueDesc colorBlackish'>We are dedicated to upholding top ethical standards in all our engagements.</h4>
        </div>
        <div className='about-content-2 second'>
          <img src={Innovation} className='valueIcon' alt='Innovation'/>
          <h2 className='colorRed valueName'>Innovation</h2>
          <h4 className='valueDesc colorBlackish'>We leverage modern tools and strategies to enhance the recruitment process.</h4>
        </div>
        <div className='about-content-2 third' >
          <img src={Partnership} className='valueIcon' alt='Partnership'/>
          <h2 className='colorRed valueName'>Partnership</h2>
          <h4 className='valueDesc colorBlackish'>We build lasting relationships with clients and candidates alike.</h4>
        </div>
        <div className='about-content-2'>
          <img src={Excellence} className='valueIcon' alt='Excellence'/>
          <h2 className='colorRed valueName'>Excellence</h2>
          <h4  className='valueDesc colorBlackish'>We are dedicated to maintaining top-tier quality in all that we do.</h4>
        </div>
      </div>
      {/* Section 3 - 1*/}
      <div id="section3Part1"className='container-size about-section-3' style={{marginTop: 2+'%',}}>
        <div className='about-pic-side'>
          <img src={Mission} alt='Our Mission' className='about-size-pic hideOnMobile'/>
          <img src={MissionMobile} alt='Our Mission' className='about-size-pic hideOnDesktop'/>
        </div>
        <div className='about-content-3'>
          <h1 className='capatalized colorBlue'>Our Mission</h1>
          <h4 className='normalTextStyle colorBlackish'>To empower organizations through innovative recruitment solutions, fostering growth and success by connecting them with exceptional talent that aligns with their strategic goals.</h4>
          <Popup btnColor='blue-popup-btn'  btnType='Normal'>To Get Enroll</Popup>
        </div>
      </div>
      {/* Section 3 - 2 */}
      <div id='section3Part2' className='container-size about-section-3'>
        <div className='about-content-3'>
          <h1 className='capatalized colorRed'>Our Vision</h1>
          <h4 className='normalTextStyle colorBlackish'>To be recognized as the leading recruitment agency, renowned for excellence in service, and for nurturing long-lasting relationships with both clients and candidates.</h4>
          <Popup btnColor='red-popup-btn'  btnType='Normal'>Let's Get Unite</Popup>
        </div>
        <div className='about-pic-side'>
          <img src={Vision} alt='Our Mission' className='about-size-pic hideOnMobile'/>
          <img src={VisionMobile} alt='Our Mission' className='about-size-pic hideOnDesktop'/>
        </div>
      </div>
      {/* Section 4*/}
      <IndustriesBox />

      {/* Section 5 */}
      <div className='container-size about-section-5'>
        <div className='textSection'>
          <h2 className='capatalizedStyle colorWhite'>Propelling your company to the forefront of success and accuracy.</h2>
          <NavLink to='/our-services' className='exploreBtn'>To Explore Options</NavLink>
        </div>
      </div>
    </>
  )
}

export default AboutUs