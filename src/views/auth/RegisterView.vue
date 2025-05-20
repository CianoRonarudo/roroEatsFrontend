<template>
    <div class="h-full grid grid-cols-12 gap-2">
        <div class="col-span-6 h-full bg-red-secondary">

        </div>
        <div class="col-span-6 h-full flex flex-col items-center justify-center">
            <div class="bg-white max-w-md p-4">
                <div class="pb-4 text-2xl font-bold">Inscription</div>
                <div>
                    <form @submit.prevent="handleRegister">
                        <div class="p-3 flex">
                            <TextInput label="Prenom" placeholder="Votre prenom" v-model="userForm.first_name" />
                            <TextInput label="Nom" placeholder="Votre nom" v-model="userForm.last_name" />
                        </div>
                        <div class="p-3">
                            <TextInput label="Votre adresse mail" placeholder="Email" v-model="userForm.email" />
                        </div>
                        <div class="p-3">
                            <PasswordInput label="Votre mot de passe" placeholder="Mot de passe" v-model="userForm.password" />
                        </div>
                        <div class="p-3">
                            <CheckboxInput label="J'accepte les conditions d'utilisation" />
                        </div>

                        <button type="submit" class="bg-orange-primary text-white w-full p-3" >S'inscrire</button>

                    </form>
                </div>
                <div>
                    <p>
                        Avez-vous déjà un compte ? <router-link to="/login" class="text-orange-primary">se connecter</router-link>
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
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';

const useAuth = useAuthStore()
const userForm = ref({
    email : '',
    password : '',
    first_name : '',
    last_name : ''
})

const handleRegister = async () =>{
    try {
        const response = await useAuth.register(userForm.value)
    } catch (error) {
        console.log('error', error)
    }
}

</script>

<style lang="scss" scoped>

</style>