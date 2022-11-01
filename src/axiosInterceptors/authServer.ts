import axios, { AxiosResponse } from 'axios'

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default axios
