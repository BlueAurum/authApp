import axios from 'axios'

const base_url = 'http://localhost:3001'

export const api = axios.create({
    baseURL: base_url,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token')
//     config.headers.Authorization = token;
//     return config
// })

export * from './endpoints'
