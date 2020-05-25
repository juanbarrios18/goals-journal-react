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
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#features'>How to</Nav.Link>
        </Nav>
        <Nav>
          <Link to='/'>Login</Link>
          <Link to='/signup'>Singup</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default welcomeNavbar
