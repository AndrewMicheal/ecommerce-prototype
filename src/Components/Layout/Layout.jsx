import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout() {
  return (
    <>
        <Navbar />
        <div className="container pt-[80px] pb-[240px]">
            <Outlet />
        </div>
        <Footer />
    </>
  )
}
