import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://geek.itheima.net',
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data;
    }
    
  }]
})

//请求拦截器
request.interceptors.request.use(
  function (config) {
    const {user} = store.state
    if (user&&user.token) {
        config.headers.Authorization = 'Bearer ' + user.token
    }
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
export default request
