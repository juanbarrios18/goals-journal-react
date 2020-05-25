import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import '../assets/styles/components/Navbar.scss'
import Logo from '../assets/static/target.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight, faAngleLeft)

const NavBar = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>
        <img src={Logo} alt='diana.png' height='40px' />
        Goal's Journal
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#features'>How to</Nav.Link>

        </Nav>
        <Nav>
          <Nav.Link id='today' href='#pricing'>Today</Nav.Link>
          <div className='date-controls'>
            <span className='angles'>
              <FontAwesomeIcon
                className='faiconsAD-nav'
                icon='angle-left'
              />
            </span>
            <input
              id='maindate'
              name='maindate'
              type='date'
              value={date}
            />
            <span className='angles'>
              <FontAwesomeIcon
                className='faiconsAD-nav'
                icon='angle-right'
              />
            </span>
          </div>
        </Nav>
        <Nav>
          <Nav.Link eventKey={2} href='#memes'>
            Hello, Juan
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
