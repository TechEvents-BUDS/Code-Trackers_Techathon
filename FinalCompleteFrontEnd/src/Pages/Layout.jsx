import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {

  return (
    <div className='flex flex-col min-h-screen' >
    <Navbar/>
    <div className='flex-grow mt-[80px]  container mx-auto px-4 mb-8 '>
     <Outlet/>
    </div >
    <Footer />
    </div> 
  )
}

export default Layout