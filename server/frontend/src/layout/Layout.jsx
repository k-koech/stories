import React from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom"
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
        <Navbar />
        <div className='min-h-[75vh]'>
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
