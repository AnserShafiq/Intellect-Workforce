import React from 'react';
import './Styles/commonStyle.css';
import './Styles/services.css';
import Popup from '../Components/Popup';
import DirectHire from '../Images/Services/direct-hire.jpg';
import TemporaryPlacement from '../Images/Services/temporary-placement.jpg'
import IndustryCard from '../Components/IndustryCard';
import { Link } from 'react-router-dom';
const industryList = [
  {
    image: '/IndustryCardPics/it.jpg',
    name: 'Information Technology',
    roles: 'Skilled labor, project managers, safety compliance personnel.',
    focus:'Understanding regulatory requirements and project timelines to find candidates who meet specific construction needs.'
  },
  {
    image: '/IndustryCardPics/health-care.jpg',
    name: 'Healthcare',
    roles: 'Skilled labor, project managers, safety compliance personnel.',
    focus:'Understanding regulatory requirements and project timelines to find candidates who meet specific construction needs.'
  },
  {
    image: '/IndustryCardPics/finance.jpg',
    name: 'Finance',
    roles: 'Skilled labor, project managers, safety compliance personnel.',
    focus:'Understanding regulatory requirements and project timelines to find candidates who meet specific construction needs.'
  },
  {
    image: '/IndustryCardPics/manufacturing.jpg',
    name: 'Manufacturing',
    roles: 'Skilled labor, project managers, safety compliance personnel.',
    focus:'Understanding regulatory requirements and project timelines to find candidates who meet specific construction needs.'
  },
  {
    image: '/IndustryCardPics/retail.jpg',
    name: 'Retail',
    roles: 'Skilled labor, project managers, safety compliance personnel.',
    focus:'Understanding regulatory requirements and project timelines to find candidates who meet specific construction needs.'
  },
  {
    image: '/IndustryCardPics/engineering.jpg',
    name: 'Engineering',
    roles: 'Skilled labor, project managers, safety compliance personnel.',
    focus:'Understanding regulatory requirements and project timelines to find candidates who meet specific construction needs.'
  },
  {
    image: '/IndustryCardPics/construction.jpg',
    name: 'Construction',
    roles: 'Skilled labor, project managers, safety compliance personnel.',
    focus:'Understanding regulatory requirements and project timelines to find candidates who meet specific construction needs.'
  },
  {
    image: '/IndustryCardPics/marketing.jpg',
    name: 'Marketing',
    roles: 'Skilled labor, project managers, safety compliance personnel.',
    focus:'Understanding regulatory requirements and project timelines to find candidates who meet specific construction needs.'
  }
]
const Services = () => {
  return (
    <>
      {/* Section 1 */}
      <div className='container-size subPagesHead services-section-1'> 
      <div className='subPageHead-content'>
          <h1 className='capatalizedStyle colorWhite'>Empower your workforce with our cutting-edge staffing solutions</h1>
          <h4 className='normalTextStyle colorWhite'>We are transforming the staffing landscape with our groundbreaking solutions and steadfast dedication to both clients and candidates.  
            <span className='hideOnMobile'>With years of expertise, we excel in matching top-tier talent with premier organizations, driving mutual growth and success.</span></h4>
          <Popup btnColor='white-popup-btn' btnType='Normal'>Let's Discuss</Popup>
        </div>
      </div>
      {/* Section 2 */}
      <div className='container-size services-section-2'>
        <h1 className='capatalizedStyle colorBlue'>Services we offers</h1>
        <h3 className='normalTextStyle colorBlackish'>At Intellect Workforce, we specialize in direct hire recruitment tailored to meet the unique needs of our clients. 
        Our Direct Hire Recruitment service is designed to connect businesses with permanent employees who are not only skilled but also a perfect cultural fit for your organization.
        We focus on understanding your business needs in-depth to ensure a comprehensive match.
        </h3>
        {/* Direct Hire */}
        <div className='service-display'>
          <div className='service-img'>
            <img src={DirectHire} alt='Direct Hire'/>
          </div>
          <div className='service-description'>
            <h3 className='service-type-name'>Key Features</h3>
            <div className='scrollArea'>
              <div className='service-type-description'>
                <p><span className='colorBlue' style={{fontWeight: 500,}}>i. Tailored Candidate Search:</span> We conduct thorough consultations to understand your specific needs, workplace culture, and long-term objectives, allowing us to identify candidates who are well-aligned with your mission.</p>
                <p><span className='colorBlue' style={{fontWeight: 500,}}>ii. Thorough Candidate Evaluation:</span> Our process includes multiple stages of evaluation: initial screening, in-depth interviews, and skills assessments, ensuring only the most qualified candidates reach your desk.</p>
                <p><span className='colorBlue' style={{fontWeight: 500,}}>iii. Cultural Fit Assessment:</span> We prioritize the alignment of candidates with your organizational values and culture, which significantly enhances long-term retention and employee satisfaction.</p>
              </div>
          </div>
          </div>
        </div>
        {/* Temporary Placement */}
        <div className='service-display reverseDisplay'>
          <div className='service-img'>
            <img src={TemporaryPlacement} alt='Temporary placement'/>
          </div>
          <div className='service-description'>
            <h3 className='service-type-name'>Benefits</h3>
            <div className='scrollArea'>
              <div className='service-type-description'>
                <p><span className='colorBlue' style={{fontWeight: 500,}}>i. Long-Term Employee Retention:</span> By focusing on cultural fit and long-term goals, our placements lead to more sustainable hiring outcomes.</p>
                <p><span className='colorBlue' style={{fontWeight: 500,}}>ii. Reduced Hiring Time & Costs:</span> Our efficient processes save you time and money, allowing you to focus on your core business operations.</p>
                <p><span className='colorBlue' style={{fontWeight: 500,}}>iii. Higher Quality Of Hires:</span> Our rigorous evaluation process ensures that only the top talent is presented to you, minimizing the risk of poor hires.</p>
              </div>
          </div>
          </div>
        </div>
        
      </div>
      {/* Section 3 */}
      <div className='container-size services-section-3'>
        <h1 className='capatalizedStyle colorBlue'>Industries We Deals In</h1>
        <div className='industries-display'>
          <div className='industries-display'>
            {industryList.map((industry, index) => (
              <IndustryCard key={index} industry={industry} />
            ))}
          </div>
        </div>
      </div>
      {/* Section 4 */}
      <div className='container-size services-section-4'>
        <div className='textSection'>
          <h2 className='capatalizedStyle colorWhite'>Accelerating Your Growth with Unmatched Success and Accuracy</h2>
          <Link to='/contact-us' className='exploreBtn'>To Link With Us</Link>
        </div>
      </div>
    </>
  )
}

export default Services