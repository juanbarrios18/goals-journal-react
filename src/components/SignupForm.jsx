import React, { useState, useEffect } from 'react'
import apiService from '../services/apiServices'
import '../assets/styles/components/SignupForm.scss'
import { Link } from 'react-router-dom'

const SignupForm = ({ setAuth, setError, setInputError, error, auth, inputError }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    userId: null
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setInputError(false)
    if (name === 'username') {
      const lowerCase = value.toLowerCase()
      setData({
        ...data,
        username: lowerCase
      })
    } else {
      setData({
        ...data,
        [name]: value
      })
    }
  }

  const dataValidation = () => {
    if (data.username === '' || data.username.match(/\s/g)) {
      setInputError(true)
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (inputError === false) {
      console.log('entro')
      apiService.createUser(data)
        .then(res => setAuth(true))
        .catch(err => {
          console.log(err)
          setError(true)
        })
    }
  }

  return (
    <div className='loginContainer'>
      <form onSubmit={(e) => handleSignup(e)} className='signup-form'>
        <div className='loginForm'>
          <div className='signupHeader'>
            <h2>Sign Up . . !</h2>
            <p>register and get all yours goal's done </p>
          </div>
          <div className='usernameGroup'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              onChange={handleInput}
              onBlur={dataValidation}
            />
          </div>
          <div className='passwordGroup'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={handleInput} />
          </div>
          <div className='errorMessage'>
            <p className='error' hidden={error === false}>User already exists</p>
            <p className='error' hidden={inputError === false}>No spaces allowed in username</p>
            <p className='message'>Registered?,  <Link to='/'>Login</Link></p>
          </div>
        </div>
        <button id='formButton'>Signup</button>
      </form>
    </div>
  )
}

export default SignupForm
