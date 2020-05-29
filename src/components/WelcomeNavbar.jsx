import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import '../assets/styles/components/Navbar.scss'
import Logo from '../assets/static/target.png'
import { Link } from 'react-router-dom'

const welcomeNavbar = () => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>
        <img src={Logo} alt='diana.png' height='50px' />
        Goal's Journal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
        <Nav.Link href='/login'>Login</Nav.Link>
        <Nav.Link href='/signup'>Signup</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default welcomeNavbar
