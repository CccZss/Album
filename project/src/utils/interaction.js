import axios from 'axios'
let ip = ''

if (process.env.NODE_ENV === 'development') {
  ip = '/czs'
} else {
  ip = ''
}

export const host = window.location.origin + ip
export const myAxios = axios.create({
  baseURL: ip
})
export const IP = ip
