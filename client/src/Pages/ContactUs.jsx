import React from 'react'
import './Styles/commonStyle.css';
import './Styles/contactus.css';
import OfficeCorridor from '../Images/ContactUs/2148427161.jpg';
import ContactForm from '../Components/ContactForm';
import { PiPhoneListFill as Phone } from "react-icons/pi";
import { FaEnvelopeOpenText as Mail} from "react-icons/fa";
import { MdOutlineShareLocation as Address} from "react-icons/md";

const ContactUs = () => {
  return (
    <>
      <div className='contact-section-1'>
        <div className='contentSide'>
          <div className='page-head-section'>
            <h5 className='normalTextStyle colorRed'>Contact Us</h5>
            <h5 className='capatalizedStyle colorBlue pageHead'>How can we <span style={{fontFamily: 'var(--montserrat-font)'}}className=' colorRed'>help ?</span></h5>
          </div>
          <div className='contact-form-section'>
              <ContactForm />
          </div>  
        </div>
        <div className='imageSide'>
          <img src={OfficeCorridor} className='contact-side-pic' alt='Office Corridor Workers'/>
        </div>
      </div>
      <div className='contact-section-2'>
        <div className='contact-card'>
          <Phone className='card-icon'/>
          <h3 className='card-name'>Phone Number</h3>
          <a href='tel:+6475031221' className='card-text'>+1 (647) 503 1221</a>
        </div>
        <div className='contact-card'>
          <Mail className='card-icon'/>
          <h3 className='card-name'>E-Mail</h3>
          <a href='mailto:info@intellectworkforce.ca' className='card-text'>info@intellectworkforce.ca</a>
        </div>
        <div className='contact-card'>
          <Address className='card-icon'/>
          <h3 className='card-name'>Address Line</h3>
          <a href='https://maps.app.goo.gl/jjPyLY4uterF2mjJ9' className='card-text'>Missisauge, ON, Canada</a>
        </div>
      </div>
    </>
  )
}

export default ContactUs
