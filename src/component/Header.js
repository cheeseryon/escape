import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'


const Header = () => {
  return (
    <>
      <nav>
          <NavLink to='/'>INTRO</NavLink>
          <NavLink to='/work'>테마 소개</NavLink>
      </nav> 
    </>
  )
}

export default Header
