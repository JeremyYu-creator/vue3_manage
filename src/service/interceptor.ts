import axios from 'axios'
// import { ServeCode } from '../types/ServeCode'
// import { Message } from 'element-ui'

const instance = axios.create({
  timeout: 3000 * 60, // 请求超时时间
})


instance.interceptors.request.use((config) => {
  // axios.interceptors.request.use((config) => {
  // 这里可以做一些请求头配置
  // config.url = config.url.replace(/\/{2,}/g, () => '/');
  // const headers = {};
  // config.headers = Object.assign({}, headers);
  return config
}, (err) => Promise.reject(err))
instance.interceptors.response.use(
  (response) => {
    const { config = {}, request = {} } = response
    // const res = response.data
    const redirectUrl = `${window.location.origin}/index.html`
    const loginPageUrl = `${window.location.origin}/login.html`

    if (config.url === '/doLogin.html' && request.responseURL && request.responseURL === redirectUrl) {
      window.location.replace(redirectUrl)
      return
    }
    if (config.url === '/logout.html') {
      window.location.replace(loginPageUrl)
      return
    }
    // window.managerWorker可以取到全局中vue
    // 这里做一些响应配置
    // if (res.retcode === ServeCode.FAILURE_DIET_REPEAT) {
    //     return response.data
    // }
    // if (res.retcode === ServeCode.FAILURE_DIET_TIME_ILLEGAL) {
    //     return response.data
    // }
    return response.data
  },
  (err) => {
    // if (err.message !== 'cancel') {
    //   window.managerWorker.$message.error('网络异常，请稍后再试')
    // }
    return Promise.reject(err)
  },
)
export default instance
