<template>
    <div class="h-full flex flex-col items-center justify-center">
       <div class="bg-white max-w-md p-4">
        <div class="pb-4">
            <img src="@/assets/img/logo-transparent.png" alt="logo" class="w-32 mx-auto">
        </div>
        <div class="pt-2 px-4 py-4">
            <div class="text-2xl font-bold">
                Bienvenue sur RoroEats
            </div>

            <div class="text-lg font-md font-light text-gray-secondary">
                Veuillez vous connecter
            </div>

        </div>
        <div>
            <form @submit.prevent="handleLogin">
                <!-- <div class="p-3">
                    <label for="email" class="block font-light">Votre adresse mail</label>
                    <input type="email" placeholder="Email" class="block w-full p-3 border border-gray-secondary" id="email">
                </div> -->

                <div class="p-3">
                    <TextInput v-model="userForm.email" label="Votre adresse mail" placeholder="Email" />
                </div>
                
                <div class="p-3">
                    <PasswordInput v-model="userForm.password" label="Votre mot de passe" placeholder="Mot de passe" />
                </div>

                <div class="flex justify-between">
                    <div>
                        <input type="checkbox">
                        <label for="">Se souvenir de moi</label>
                    </div>
                    <div>
                        <a href="#">Mot de passe oublié ?</a>
                    </div>
                </div>
                <button type="submit" class="bg-orange-primary text-white w-full p-3" >Se connecter</button>

                
            </form>

        </div>

        <div>
            <p>
                Vous n'avez pas de compte ? <router-link to="/register" class="text-orange-primary">s'inscrire</router-link>
            </p>
        </div>

       </div>
    </div>
</template>

<script setup>

import PasswordInput from '@/components/ui/PasswordInput.vue';
import TextInput from '@/components/ui/TextInput.vue';
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