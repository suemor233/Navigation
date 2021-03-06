import { extend } from 'umi-request'
import QProgress from 'qier-progress'
import { notice } from '../utils/notice'
const qprogress = new QProgress()
/**
 * 配置request请求时的默认参数
 */
const client = extend({
  prefix: import.meta.env.VITE_API_API_URL as string,
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// request拦截器, 改变url 或 options
client.interceptors.request.use(
  (url: string, options: any) => {
    qprogress.start()

    return {
      url,
      options: { ...options }
    }
  },
  { global: false }
)

client.interceptors.response.use(async (response: any) => {
  const res = await response.clone().json()
  qprogress.finish()

  if (res.ok === 0) {
    if (Array.isArray(res.message)) {
      notice.error(res.message[0])
    } else {
      notice.error(res.message)
    }
    return undefined
  }

  return response
})

export default client
