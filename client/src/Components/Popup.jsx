import React, { useState } from 'react';
import './ComponentsStyles/popup.css';
import { IoCloseCircleOutline as CloseIcon} from "react-icons/io5";
import { Link } from 'react-router-dom';




export default function Popup({children, btnColor, btnType}) {
    
    const DataDisplay = (props) => {
        let backgroundByType = '';
        if(btnType ==='Emp')
            backgroundByType = 'bg-2';
        else if(btnType === 'JS')
            backgroundByType = 'bg-3';
        else
            backgroundByType = 'bg-1';

        return props.trigger ? (
            <div className='popup-area'>
                <div className={`popup-content ${backgroundByType}`}>
                    <button className='popup-closeBtn' onClick={() => props.setTrigger(false)}><CloseIcon /></button>
                    {props.children}
                </div>
            </div>
        ) : '';
    };
    
    const [popupCall, setPopupCall] = useState(false); 

    return (
        <div>
            <button className={`popBtn ${btnColor}`} onClick={() => setPopupCall(true)}>{children}</button>
            <DataDisplay trigger={popupCall} setTrigger={setPopupCall}>
                <div className='popUpData'>
                    <h3>What are you looking for ?</h3>
                    <div className='popup-child-btns'>
                        <Link className='popup-child-btn' to='/job-seekers/job-application'>Looking for jobs </Link>
                        <Link className='popup-child-btn' to='/employers/employees-required'>Looking for candidates</Link>
                    </div>
                </div>
        </DataDisplay>
        </div>
    );
}
