import axios from 'axios'
//封装axios
const request = axios.create({
    // baseURL: 'http://117.72.96.72:8842/',
    baseURL: 'http://117.72.96.72:8848/',

    timeout: 5000
})









export  default request