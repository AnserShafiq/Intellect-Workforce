import React, { useState, useEffect } from 'react';
import './ComponentsStyles/componentsStyle.css';
import Logo from '../Images/logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as OpenMenu } from '../Images/Icons/open-menu.svg';
import { ReactComponent as CloseMenu } from '../Images/Icons/close-menu.svg';
import { AiOutlineFileSearch } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";


const Header = () => {
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(50);
    const [logoSize, setLogoSize] = useState('large');

    const controlHeader = () => {
        if (window.scrollY > lastScrollY) {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
        setLastScrollY(window.scrollY);
        // console.log('==> ', lastScrollY )
        
        if (window.scrollY > 100) {
            const myHeader = document.getElementById('mainHeader');
            myHeader.style.boxShadow = '0px 0px 10px #041132';
            setLogoSize('small');
        } else if(window.scrollY === 0 ){
            const myHeader = document.getElementById('mainHeader');
            myHeader.style.boxShadow = '0px 0px 0px #04113200';
            setLogoSize('large');
        }
    };

    const [displayNavbar, setNavbarDisplay] = useState(false);

    const handleNavbar = () => {
        setNavbarDisplay(!displayNavbar);
        const openMenuIcon = document.getElementById('open-icon');
        if (displayNavbar === false) {
            openMenuIcon.style.display = 'none';
        } else if (displayNavbar === true) {
            openMenuIcon.style.display = 'block';
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', controlHeader);
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    });
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0,0)
    }, [location]);

    // const displayDropdown = () =>{
    //     console.log('Mouse On Job Seekers')
    // }

    return (
        <header id='mainHeader' className={`header sticky-header ${showHeader ? 'visible' : 'hidden'}`}>
            {/* Header Logo */}
            <div className={`logoSection ${logoSize}`} onClick={() => window.location.href = '/'}>
                <img className={`headerLogo ${logoSize}`} src={Logo} alt="Intellect Workforce's Logo" />
            </div>

            {/* Mobile View Menu Icon */}
            <div className='menuIcon' onClick={handleNavbar}>
                <OpenMenu id='open-icon' />
            </div>

            <div className={`menuSection ${displayNavbar && 'active'}`}>
                <div className='sideMenuHead'>
                    <img className='mobileSidebarLogo' src={Logo} alt="Intellect Workforce's Logo" />
                    <CloseMenu className='closeIcon' alt='close menu icon' onClick={handleNavbar} />
                </div>
                <div className='headerMenu'>
                    <h4><NavLink className={({ isActive }) => isActive ? 'headerMenuBtn activeBtn' : 'headerMenuBtn'} to='/'>Home</NavLink></h4>
                    <h4><NavLink className={({ isActive }) => isActive ? 'headerMenuBtn activeBtn' : 'headerMenuBtn'} to='/about-us'>About Us</NavLink></h4>
                    <h4><NavLink className={({ isActive }) => isActive ? 'headerMenuBtn activeBtn' : 'headerMenuBtn'} to='/employers'>Employers</NavLink></h4>
                    <h4 className='dropdown-btn hideOnMobile'>
                        <NavLink className={({ isActive }) => isActive ? 'headerMenuBtn activeBtn' : 'headerMenuBtn'} to='/job-seekers'>Job Seekers<FaAngleDown /></NavLink>
                        <div className='dropdown-list'>
                            <NavLink to='/job-seekers'>Job Seekers</NavLink>
                            <NavLink to='/job-board'>Explore Job Options</NavLink>
                        </div>
                    </h4>
                    <h4><NavLink className={({ isActive }) => isActive ? 'headerMenuBtn activeBtn hideOnDesktop' : 'headerMenuBtn  hideOnDesktop'} to='/job-seekers'>Job Seekers </NavLink></h4>
                    <h4><NavLink className={({ isActive }) => isActive ? 'headerMenuBtn activeBtn hideOnDesktop' : 'headerMenuBtn  hideOnDesktop'} to='/job-board'>Explore Job Options</NavLink></h4>
                    <h4><NavLink className={({ isActive }) => isActive ? 'headerMenuBtn activeBtn' : 'headerMenuBtn'} to='/our-services'>Our Services</NavLink></h4>
                    <h4><NavLink className={({ isActive }) => isActive ? 'headerMenuBtn activeBtn hideBtnOnDesktop' : 'headerMenuBtn hideOnDesktop'} to='/contact-us'>Contact Us</NavLink></h4>
                </div>
                <div className='sideMenuFoot'>
                    <div className='socailIconsDiv'>
                        <AiOutlineFileSearch className='socialIcon' />
                        <a href='/'>Looking For A Job?</a>
                    </div>
                    <h4 className='sideBarOR'>OR</h4>
                    <div className='socailIconsDiv'>
                        <RiTeamFill className='socialIcon' />
                        <a href='/'>Looking For Candidates?</a>
                    </div>
                </div>
            </div>
            <div className='contactBtnSection'>
                <button className='headerContactBtn' ><NavLink className='headerContactBtnText' to='/contact-us'>Contact Us</NavLink></button>
            </div>
        </header>
    );
}

export default Header;
