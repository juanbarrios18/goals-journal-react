import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }) => (
  <div className='App'>
    <Navbar />
    {children}
  </div>
)

export default Layout
