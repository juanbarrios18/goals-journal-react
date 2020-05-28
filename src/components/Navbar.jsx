import React, { useEffect, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import '../assets/styles/components/Navbar.scss'
import Logo from '../assets/static/target.png'
import apiServices from '../services/apiServices'

const NavBar = () => {
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(window.localStorage.username)
  }, [])

  const handleLogout = () => {
    apiServices.logout()
    window.localStorage.removeItem('userId')
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>
        <img src={Logo} alt='diana.png' height='40px' />
        Goal's Journal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/howto'>How to</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link eventKey={2} href='#memes'>
            Hello, {username || ''}
          </Nav.Link>
          <Nav.Link href='/' id='logout' onClick={handleLogout}>Logout</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
