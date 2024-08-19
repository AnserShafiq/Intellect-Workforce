import React from 'react';
import './ComponentsStyles/componentsStyle.css';
import Logo from '../Images/logo.png';
import { MdOutlineAddIcCall as CallIcon} from "react-icons/md";
import { IoMailUnreadOutline  as MailIcon} from "react-icons/io5";
import { IoLogoLinkedin as LinkedIn } from "react-icons/io5";
import { FaSquareFacebook as Facebook} from "react-icons/fa6";
import { FaSquareInstagram as Instagram } from "react-icons/fa6";
import { FaRegCopyright as Copyright } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <>
        <div className='footerSection'>
            <div className='footerDiv '>
                <img src={Logo} alt='Logo In Footer' className='footerLogo'/>
            </div>
            <div className='footerDiv '>
                <h3 className='footerHeading'>Fast Links</h3>
                <div className='footer-child-section'>
                    <Link to='/about-us' className='footerBtn'>About Us</Link>
                    <Link to='/job-seekers' className='footerBtn'>Job Seekers</Link>
                    <Link to='/employers' className='footerBtn'>Employers</Link>
                    <Link to='/our-services' className='footerBtn'>Services We Provides</Link>
                    <Link to='/job-board' className='footerBtn'>Explore Job Options</Link>
                    <Link to='/contact-us' className='footerBtn'>Resources</Link>
                </div>
            </div>
            <div className='footerDiv '>
                <h3 className='footerHeading'>Services We Deal</h3>
                <div className='footer-child-section'>
                    <a href='/' className='footerBtn'>Construction</a>
                    <a href='/' className='footerBtn'>Healthcare</a>
                    <a href='/' className='footerBtn'>Finance</a>
                    <a href='/' className='footerBtn'>Information Technology</a>
                    <a href='/' className='footerBtn'>Manufacturing</a>
                    <a href='/' className='footerBtn'>Retail</a>
                    <a href='/' className='footerBtn'>Engineering</a>
                    <a href='/' className='footerBtn'>Marketing</a>
                </div>
            </div>
            <div className='footerDiv '>
                <h3 className='footerHeading'>Get In Touch</h3>
                <div className='footer-child-section'>
                    <Link to='/job-seekers/job-application' className='footerBtnWithIcon withTransBack'>Looking For Jobs?</Link>
                    <Link to='/employers/employees-required' className='footerBtnWithIcon withFilledBack'>Searching For Candidate?</Link>
                    <a href='tel:+15198574080' className='footerBtnWithIcon sideIcon'><CallIcon className='footerIcon'/>(519) 857 4080</a>
                    <a href='mailto:info@intellectworkforce.ca' className='footerBtnWithIcon sideIcon'><MailIcon className='footerIcon'/>info@intellectworkforce.ca</a>
                </div>
                <h3 className='footerHeading'>Follow Us</h3>
                <div className='footer-child-social-section'>
                    <a href='/' className='footerSocialIcon'><Facebook /></a>
                    <a href='/' className='footerSocialIcon'><LinkedIn /></a>
                    <a href='/' className='footerSocialIcon'><Instagram /></a>
                </div>
            </div>
            
        </div>
        <div className='copy-right'>
            <h5 className='copy-right-text'>
                Copyright <Copyright className='copy-right-icon'/> 2024 Intellect Workforce. All Rights Reserved. 
            </h5>
        </div>
    </>
  )
}

export default Footer