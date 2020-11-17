import Axios from 'axios'

const ApiClient = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? `${window.location.href}api`
      : 'http://localhost:3001/api'
})

ApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

export default ApiClient
