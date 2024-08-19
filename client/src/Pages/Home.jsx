import React from 'react';
import './Styles/commonStyle.css';
import './Styles/home.css';
import ContractualHand from '../Images/Home/home-2.jpg'
import CardImg1 from '../Images/Home/expert.jpg';
import CardImg2 from '../Images/Home/tailoredSolutions.jpg';
import CardImg3 from '../Images/Home/comprehensiveSupport.jpg';
import CardImg4 from '../Images/Home/clientsTrust.jpg';
import CardImg5 from '../Images/Home/tools.jpg';
import PeoplesImg from '../Images/Home/home-4.png';
import IndustriesBox from '../Components/IndustriesBox';
import { NavLink,Link } from 'react-router-dom';


const Home = () => {
  return (
    <section>
      {/* Section 1 */}
      <div className='container-size home-section-1'>
        <div className='mainContent'>
          <h1 className='pageTag'>Find the Perfect Fit, Every Time, with <br className='hideOnMobile'/> <span>Our Comprehensive & Tailored</span><br className='hideOnMobile'/> Recruitment Solutions</h1>
          <h4 className='pageTagDesc'>Achieve the perfect match every time with our tailored recruitment solutions, designed to meet the needs of both job seekers and employers.</h4>
          <div className='buttonsDiv'>
            <NavLink to='/job-seekers/job-application'>Get a best option</NavLink>
            <NavLink to='/employers/employees-required'>Let's start to hire</NavLink>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      <div className='container-size home-section-2'>
        <div className='inner-section-2' >
          <h1 className='capatalizedStyle colorWhite' >Why Choose Intellect Workforce?</h1>
          <div className='cardsContainer'>
          <div className='cardBox'>
            <img src={CardImg1} className='cardImg' alt='Experise' />
              <div className='cardText'>
                <h3 className='cardHeadStyle colorWhite'>Tailored talent solutions backed by market insights</h3>
                <h5 className='cardTextStyle colorWhite '>Our recruitment specialists possess extensive industry knowledge, allowing us to deliver the best matches for your specific needs. We continually update our understanding of market trends and skill demands.</h5>
              </div>
          </div>

          <div className='cardBox'>
            <img src={CardImg2} className='cardImg' alt='Experise' />
              <div className='cardText'>
                <h3 className='cardHeadStyle colorWhite'>Personalized recruitment services for optimal results</h3>
                <h5 className='cardTextStyle colorWhite '>Recognizing that every business is unique, we customize our services to align with your specific requirements. Our client-centric approach ensures we effectively address your challenges.</h5>
              </div>
          </div>

          <div className='cardBox'>
            <img src={CardImg3} className='cardImg' alt='Experise' />
              <div className='cardText'>
                <h3 className='cardHeadStyle colorWhite'>Ongoing support throughout the hiring process</h3>
                <h5 className='cardTextStyle colorWhite '>From initial consultation through candidate placement, we provide ongoing support. Our transparent communication and collaborative methods help ensure a smooth hiring process.</h5>
              </div>
          </div>
          <div className='cardBox'>
            <img src={CardImg4} className='cardImg' alt='Experise' />
              <div className='cardText'>
                <h3 className='cardHeadStyle colorWhite'>Commitment to quality demonstrated by client trust</h3>
                <h5 className='cardTextStyle colorWhite '>With a history of successful placements across various industries, our clients trust us to deliver high-quality candidates consistently. Our testimonials reflect our commitment to excellence.</h5>
              </div>
          </div>
          <div className='cardBox'>
            <img src={CardImg5} className='cardImg' alt='Experise' />
              <div className='cardText'>
                <h3 className='cardHeadStyle colorWhite'>Efficient candidate sourcing through modern tools</h3>
                <h5 className='cardTextStyle colorWhite '>We leverage state-of-the-art recruitment technologies and tools to streamline our processes and enhance our service delivery, ensuring efficiency and accuracy in candidate sourcing.</h5>
              </div>
          </div>


          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className='container-size home-section-3'>
        <div className='division-section-3'>
            <img src={ContractualHand} alt='Person Getting Hired' className='imgBox'/>
        </div>
        <div className='division-section-3'>
          <h1 className='capatalizedStyle colorBlue'>Connecting exceptional talent with leading organizations across various industries</h1>
          <h4 className='normalTextStyle colorBlack'>At Intellect Workforce, we bridge the gap between top-tier talent and premier organizations across diverse industries. Our dedication to recruitment excellence guarantees that both employers and job seekers reach their objectives. Explore how we can assist you in securing your next hire or career opportunity.</h4>
          <Link to='/employers/employees-required'><button className='sideBtn colorBtnRed' >Connect With Us</button></Link>
        </div>
      </div>

      {/* Section 4 */}
      <IndustriesBox />
      {/* Section 5 */}
      <div className='container-size home-section-5'>
        <div className='innerContent'>
          <h1 className='capatalizedStyle colorWhite'>There's no doubt, collaborating <br className='hideOnMobile'/>with us is outstanding</h1>
          <div className='listOfContent'>
            <h4><span style={{color: 'var(--red-font-color)'}}>✔</span>  The Perfect Fit</h4>
            <h4><span style={{color: 'var(--red-font-color)'}}>✔</span>  Flexible Staffing Solutions</h4>
            <h4><span style={{color: 'var(--red-font-color)'}}>✔</span>  Industry Expertise</h4>
            <h4><span style={{color: 'var(--red-font-color)'}}>✔</span>  Rapid Response</h4>
            <h4><span style={{color: 'var(--red-font-color)'}}>✔</span>  Comprehensive Support</h4>
          </div>
        </div>
      </div>
      {/* Section 6 */}
      <div className='container-size home-section-6'>
        <div className='division-section-3'>
          <h1 className='capatalizedStyle colorBlue'>Aim to deliver exceptional service & ensure client satisfaction.</h1>
          <h4 className='normalTextStyle colorBlack'>Intellect Workforce is building a stellar reputation for its unwavering commitment to excellence in staffing solutions. With a focus on creativity and innovation, they don't merely fill positions; they forge meaningful connections between employers and job seekers. Their dedication to pushing boundaries guarantees that every placement is both effective and impactful. Whether you're looking for permanent, temporary, direct, or contractual roles, Intellect Workforce excels as a premier agency that prioritizes creativity and results.</h4>
          <Link to='/job-seekers/job-application'  style={{textDecoration:'none'}}><h3 style={{textDecoration:'none'}} className='sideBtn colorBtnRed'>To Enroll, To Explore</h3></Link>
        </div>
        <div className='division-section-3'>
        <img src={PeoplesImg} alt='Person Getting Hired' className='peopleImg'/>
        </div>
      </div>
      {/* Section 7 */}
      <div className='container-size home-section-7'>
        <div className='textSection'>
          <h2 className='capatalizedStyle colorWhite'>Hoping to elevate your company's success and precision to new heights?<br className='hideOnMobile'/> <span className='attractionLine'>See what we can do for you. </span></h2>
          <NavLink to='/about-us' className='exploreBtn'>Explore More</NavLink>
        </div>
      </div>
      
    </section>
  )
}

export default Home