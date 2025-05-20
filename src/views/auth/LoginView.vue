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
                <TextInput 
                    v-model="userForm.email" 
                    label="Votre adresse mail" 
                    placeholder="Email"
                    icon="envelope"
                    class="w-full"
                />
                
                <PasswordInput 
                    v-model="userForm.password" 
                    label="Votre mot de passe" 
                    placeholder="Mot de passe"
                    icon="lock"
                    class="w-full"
                />

                <div class="flex flex-col sm:flex-row justify-between items-center">
                    <!-- <label class="inline-flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" class="rounded border-gray-300 text-orange-primary focus:ring-orange-primary">
                        <span class="text-sm text-gray-600">Se souvenir de moi</span>
                    </label> -->
                    <CheckboxInput label="Se souvenir de moi" />
                    <router-link 
                        to="/forgot-password" 
                        class="text-sm text-orange-primary hover:underline"
                    >
                        Mot de passe oublié ?
                    </router-link>
                </div>

                <button 
                    type="submit" 
                    class="w-full bg-orange-primary hover:bg-orange-600 text-white py-3 px-4 rounded-md transition duration-200 font-medium"
                >
                    Se connecter
                </button>
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
import TextInput from '@/components/ui/TextInput.vue';
import CheckboxInput from '@/components/ui/CheckboxInput.vue';
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';

const useAuth = useAuthStore()

const userForm = ref({
    email : '',
    password : ''
})

const handleLogin = async () =>{
    try {
        const response = await useAuth.login(userForm.value)
    } catch (error) {
        console.log('error', error)
    }
}



</script>

<style lang="scss" scoped>

</style>