<template>
    <div class="min-h-screen flex items-center justify-center p-4">
       <div class="bg-white w-full max-w-md rounded-lg shadow-md overflow-hidden">
        <!-- En-tête -->
        <div class="p-6 text-center">
            <img src="@/assets/img/logo-transparent.png" alt="logo" class="w-32 mx-auto">
            <h1 class="text-2xl font-bold mt-4">Bienvenue sur RoroEats</h1>
            <p class="text-gray-primary/90 font-light">Veuillez vous connecter</p>
        </div>

        <!-- Formulaire -->
        <div class="p-6 space-y-4">
            <form @submit.prevent="handleLogin" class="space-y-4">
                <EmailInput 
                    v-model="userForm.email" 
                    label="Votre adresse mail" 
                    placeholder="Email"
                    icon="envelope"
                    class="w-full"
                    :error="v$.email.$errors[0]?.$message"
                    @blur="v$.email.$touch()"
                />
                
                <PasswordInput 
                    v-model="userForm.password" 
                    label="Votre mot de passe" 
                    placeholder="Mot de passe"
                    icon="lock"
                    class="w-full"
                    :error="v$.password.$errors[0]?.$message"
                    @blur="v$.password.$touch()"
                />

                <div class="flex flex-col sm:flex-row justify-between items-center">
                    
                    <CheckboxInput label="Se souvenir de moi" />
                    <router-link 
                        to="/forgot-password" 
                        class="text-sm text-orange-primary hover:underline"
                    >
                        Mot de passe oublié ?
                    </router-link>
                </div>

                <BtnInput :loading="useAuth.isLoading" :disabled="v$.$invalid">Se connecter</BtnInput>
                
            </form>

            <div class="text-center pt-4 border-t border-gray-100">
                <p class="text-gray-600">
                    Vous n'avez pas de compte ? 
                    <router-link 
                        to="/register" 
                        class="text-orange-primary hover:underline font-medium"
                    >
                        S'inscrire
                    </router-link>
                </p>
            </div>
        </div>
       </div>
    </div>
</template>


<script setup>

import PasswordInput from '@/components/ui/PasswordInput.vue';
import CheckboxInput from '@/components/ui/CheckboxInput.vue';
import BtnInput from '@/components/ui/BtnInput.vue';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
import EmailInput from '@/components/ui/EmailInput.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { authValidations } from '@/utils/validators';
import useVuelidate from '@vuelidate/core';



const useAuth = useAuthStore()

const toast = useToast()

const router = useRouter()

const userForm = ref({
    email : '',
    password : ''
})

const rules = {
    email : authValidations.email,
    password : authValidations.password
}

const v$ = useVuelidate(rules, userForm)

const handleLogin = async () =>{
    

    try {
        const isValid = await v$.value.$validate()

        if (!isValid) {
            v$.value.$errors.forEach((error) => {
                toast.error(error.$message)
            })
            return
        }
        const response = await useAuth.login(userForm.value)

        if (response.success) {
            toast.success(response.message || 'Connexion reussie')
            await router.push('/')
        } else{
            toast.error(response.message || 'Identifiants incorrects')
        }
        
    } catch (error) {
        console.error('error', error)
        toast.error('La connexion a échouée')
        userForm.value.password = ''
    }
}



</script>

<style lang="scss" scoped>

</style>