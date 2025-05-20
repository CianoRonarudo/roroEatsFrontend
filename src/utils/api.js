import axios from "axios"

const API_URL = 'http://127.0.0.1:8000/api/'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
           originalRequest._retry = true
           const refresh = localStorage.getItem('refresh')
           if (refresh) {
               try{
                const res = await axios.post(`${API_URL}api/token/refresh/`, {
                    refresh
                })
                localStorage.setItem('access', res.data.access)
                api.defaults.headers.Authorization = `Bearer ${res.data.access}`
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`
                return api(originalRequest)
               } catch (error) {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                window.location.href = '/login'
               }
                
               }
           }
            return Promise.reject(error)
        }
        
    
)
export default api