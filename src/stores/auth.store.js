import api from "@/utils/api"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import { useToast } from "vue-toastification"

const router = useRouter()
const toast = useToast()

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user : null,
        token  : localStorage.getItem('access') || null,
        refresh : localStorage.getItem('refresh') || null,
        isLoading : false,
        errors : {},
        message : ''
    }),

    getters : {
        isAuthenticated : (state) => !!state.token,
        currentUser : (state) => state.user,
    },
    
    actions: {
        async register(userData) {
            this.isLoading = true
            this.errors = {}
            this.message = ''
            try {
                const response = await api.post('auth/register/',{
                    email : userData.email,
                    password : userData.password,
                    first_name : userData.first_name,
                    last_name : userData.last_name
                })

                this.message = response.data.message
                console.log('response', response)
                toast.success(this.message)
                return {
                    success : true,
                    message : this.message
                }
            }
            catch(error){
                if (error.response?.status === 400) {
                    this.errors = error.response.data
                   console.log('errors', this.errors)
                }
                else {
                    this.message = error.message
                    
                }
                console.log('error', error)
                toast.error(this.message)
                return {
                    success : false,
                    message : this.message
                }
            } finally {
                this.isLoading = false
            }
        },

        async login(credentials){
            this.isLoading = true
            this.errors = {}
            this.message = ''

            try{
                const response = await api.post('auth/login/', {
                    email : credentials.email,
                    password : credentials.password
                })
                this.token = response.data.access
                this.refresh = response.data.refresh
                localStorage.setItem('access', this.token)
                localStorage.setItem('refresh', this.refresh)
                this.user = response.data.user
                this.message = response.data.message
                toast.success(this.message)
                return {
                    success : true,
                    message : this.message
                }
            } catch(error){
                if(error.response?.status === 401){
                    this.message = error.data
                    toast.error(this.message)
                    return {
                        success : false,
                        message : this.message
                    }
                } else {
                    this.message = error.message
                    toast.error(this.message)
                    return {
                        success : false,
                        message : this.message
                    }
                }
            } finally{
                this.isLoading = false
            }
        }
    }
})