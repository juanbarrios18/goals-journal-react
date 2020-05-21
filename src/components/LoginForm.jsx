import React, { useState } from 'react'
import apiService from '../services/apiServices'

const LoginForm = () => {
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
    const userId = window.localStorage.userId || null
    if (userId) {
      setData({ userId })
      return data.userId
    }
    apiService.login(data)
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type='text' name='username' onChange={handleInput} />
        <input type='password' name='password' onChange={handleInput} />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
