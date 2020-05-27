import React, { useState } from 'react'
import apiService from '../services/apiServices'
import { Link } from 'react-router-dom'
import '../assets/styles/components/LoginForm.scss'

const LoginForm = ({ setAuth, setError, error, auth }) => {
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

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('ok')
    const userId = window.localStorage.userId || null
    if (userId) {
      setData({ userId })
    }
    apiService.login(data)
      .then(res => {
        if (res.data === 'no user') {
          setError(true)
        } else {
          setAuth(true)
          window.localStorage.setItem('userId', res.data)
        }
      })
      .catch(err => {
        console.log(err)
        setAuth(false)
        setError(true)
      })
  }

  return (
    <div className='loginContainer'>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='loginForm'>
          <div className='loginHeader'>
            <h2>Welcome . . !</h2>
            <p>login and get all yours goal's done </p>
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
            <p id='error' hidden={error === false}>Intenta de nuevo</p>
            <p>Not registered yet?,  <Link to='/signup'>Signup</Link></p>
          </div>
        </div>
        <button id='formButton'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
