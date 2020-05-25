import React from 'react'
import SignupForm from '../components/SignupForm'
import WelcomeNavbar from '../components/WelcomeNavbar'

const Signup = ({ myList, trends, originals }) => {
  return (
    <>
      <WelcomeNavbar />
      <SignupForm />
    </>
  )
}

export default Signup
