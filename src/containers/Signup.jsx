import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import WelcomeNavbar from '../components/WelcomeNavbar'

const Signup = () => {
  const [auth, setAuth] = useState(false)
  const [error, setError] = useState(false)

  return (
    <>
      <WelcomeNavbar />
      {auth ? <Redirect to='/home' /> : null}
      <SignupForm setAuth={setAuth} auth={auth} setError={setError} error={error} />
    </>
  )
}

export default Signup
