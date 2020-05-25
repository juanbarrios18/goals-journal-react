import React, { useState } from 'react'
import apiService from '../services/apiServices'
import '../assets/styles/components/signupForm.scss'
import { Link } from 'react-router-dom'

const SignupForm = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    error: false,
    userId: null
  })
  const handleInput = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSignup = (e) => {
    e.preventDefault()
    const userId = window.localStorage.userId || null
    if (userId) {
      setData({ userId })
      return data.userId
    }
    apiService.login(data)
  }

  return (
    <div className='loginContainer'>
      <form onSubmit={handleSignup} className='signup-form'>
        <div className='loginForm'>
          <div className='signupHeader'>
            <h2>Hello . . !</h2>
            <p>register and get all yours goal's done </p>
          </div>
          <div className='usernameGroup'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' onChange={handleInput} />
          </div>
          <div className='passwordGroup'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={handleInput} />
          </div>
          <div className='signup'>
            <p>Registered?,  <Link to='/'>Login</Link></p>
          </div>
        </div>
        <button id='formButton'>Signup</button>
      </form>
    </div>
  )
}

export default SignupForm
