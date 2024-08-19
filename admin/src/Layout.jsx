import React from 'react'
import './style.css'
import Header from './Components/header'



const Layout = ({children}) => {
  
  return (
    <div className='layout'>
        <Header />
        <div className='content'>
            {children}
        </div>
    </div>
  )
}

export default Layout