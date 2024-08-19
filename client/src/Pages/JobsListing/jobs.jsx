import React, { useState } from 'react'
import '../Styles/commonStyle.css'
import './jobs.css'
import AvailableJobs from './AvailableJobs'


const Jobs = () => {
    const [titleInput, setTitleInput] = useState('')
    const [locationInput, setLocationInput] = useState('')
    const [filterByTitle, setFilterByTitle] = useState('')
    const [filterByLocation, setFilterByLocation] = useState('')

    const handleFilters = (e) =>{
        e.preventDefault();
        setFilterByLocation(locationInput);
        setFilterByTitle(titleInput);
        console.log(`Filters Form: ${filterByTitle}, ${filterByLocation} `)
    }


    return (
        <div className='jobs-table'>
            
            <div className='jobs-filter-section'>
                <h1 className='capatalizedStyle colorRed'>Let's Explore Jobs</h1>
                <form onSubmit={handleFilters} className='jobs-filter-form'>
                    <div  className='search-section'>
                        <label className='search-label'>Job Title</label>
                        <input className='search-input' type='text' placeholder='Search by job title' value={titleInput} onChange={(e) => setTitleInput(e.target.value)}/>
                    </div>
                    <div className='search-section'>
                        <label className='search-label'>Location</label>
                        <input className='search-input' type='text' placeholder='Search by location' value={locationInput} onChange={(e) => setLocationInput(e.target.value)}/>
                    </div>
                    <button className='search-btn' type='submit'>Search Jobs</button>
                </form>
            </div>
            <AvailableJobs ByTitleDisplay={filterByTitle} ByLocationDisplay={filterByLocation}/>

        </div>
    )
}

export default Jobs