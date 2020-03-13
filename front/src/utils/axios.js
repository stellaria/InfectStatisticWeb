import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://118.178.184.69:8887/'
})

export default instance