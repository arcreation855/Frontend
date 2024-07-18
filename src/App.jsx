import React from 'react'
import Footer from './Components/Common/Footer'
import Navbar from './Components/Common/Navbar'
import { Outlet } from 'react-router-dom'
// import './App.css'

function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
