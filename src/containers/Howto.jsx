import React from 'react'
import Navbar from '../components/Navbar'
import WelcomeNavbar from '../components/WelcomeNavbar'
import instructions from '../assets/static/goalsjournal-instructions.png'

const Howto = () => {
  const user = window.localStorage.userId || null
  return (
    <>
      {(user)
        ? <Navbar />
        : <WelcomeNavbar />}
      <img src={instructions} alt='instructions' id='instructions' width='1000' />
    </>
  )
}

export default Howto
