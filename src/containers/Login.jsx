import React, { useState } from 'react'
import WelcomeNavbar from '../components/WelcomeNavbar'
import { Redirect } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Login = () => {
  const [auth, setAuth] = useState(false)
  const [error, setError] = useState(false)
  const [inputError, setInputError] = useState(false)

  return (
    <>
      <WelcomeNavbar />
      {auth ? <Redirect to='/home' /> : null}
      <LoginForm
        setAuth={setAuth}
        auth={auth}
        setError={setError}
        error={error}
        inputError={inputError}
        setInputError={setInputError}
      />
    </>
  )
}

export default Login
