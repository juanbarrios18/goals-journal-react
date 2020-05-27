import axios from 'axios'

const URL = 'https://goals-journal--api.herokuapp.com/'
const http = axios.create({
  baseURL: URL
})

// LOGIN
const createUser = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    http.post('/signup', { username, password })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

const login = ({ username, password }) => {
  console.log(URL)
  return new Promise((resolve, reject) => {
    http.post('/login', { username, password })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
const logout = () => axios.post('/logout')

// BULLETS
const getBullets = (userid) => {
  return new Promise((resolve, reject) => {
    http.get(`/bullets/${userid}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}
const newBullet = data => {
  return new Promise((resolve, reject) => {
    http.post('bullets/new', { data })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}
const deleteBullet = id => {
  http.post(`/bullets/${id}/delete`)
}

const updateBullet = (id, data) => {
  return new Promise((resolve, reject) => {
    http.post(`/bullets/${id}/edit`, { data })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

// GOALS
const getGoals = (userid) => {
  return new Promise((resolve, reject) => {
    http.get(`/goals/${userid}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}
const newGoal = data => {
  return new Promise((resolve, reject) => {
    http.post('goals/new', { data })
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}
const deleteGoal = id => {
  http.post(`/goals/${id}/delete`)
}

const updateGoal = (id, data) => {
  return new Promise((resolve, reject) => {
    http.post(`/goals/${id}/edit`, { data })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export default {
  login,
  logout,
  createUser,
  getBullets,
  newBullet,
  deleteBullet,
  updateBullet,
  getGoals,
  newGoal,
  deleteGoal,
  updateGoal
}
