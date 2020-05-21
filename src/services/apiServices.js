import axios from 'axios'

const URL = 'http://localhost:8080/'
const http = axios.create({
  baseURL: URL
})

const createUser = ({ username, password }) =>
  axios.post('/signup', { username, password })

const login = ({ username, password }) => {
  http.post('/login', { username, password })
    .then(res => window.localStorage.setItem('userId', res.data))
    .catch(err => console.log(err))
}

const logout = () => axios.post('/logout')

const getBullets = (userid) => {
  http.get(`/bullets/${userid}`)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}
export default {
  login,
  logout,
  createUser,
  getBullets
}
