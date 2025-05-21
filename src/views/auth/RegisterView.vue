<template>
    <div class="h-full grid grid-cols-12 gap-2">
        <div class="col-span-6 h-full">

        </div>
        <div class="col-span-6 h-full flex flex-col items-center justify-center">
            <div class="bg-white w-full max-w-md rounded-lg shadow-md overflow-hidden">
                <div class="p-6 text-center">
                    
                    <h1 class="text-2xl font-bold mt-4">Inscription</h1>
                    <p class="text-gray-primary/90 font-light">Veuillez vous inscrire</p>
                </div>

                <!-- Formulaire -->
                <div class="p-6 space-y-4">
                    <form @submit.prevent="handleRegister" class="space-y-4">
                        <div class="flex gap-4">
                            <TextInput 
                                v-model="userForm.first_name" 
                                label="Votre prenom" 
                                placeholder="Prenom"
                                class="w-full"
                                :error="v$.first_name.$errors[0]?.$message"
                                @blur="v$.first_name.$touch()"
                            >
                            </TextInput>
                            <TextInput 
                                v-model="userForm.last_name" 
                                label="Votre nom" 
                                placeholder="Nom"
                                class="w-full"
                                :error="v$.last_name.$errors[0]?.$message"
                                @blur="v$.last_name.$touch()"
                            >
                            </TextInput>
                        </div>
                        <EmailInput 
                            v-model="userForm.email" 
                            label="Votre adresse mail" 
                            placeholder="Email"
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


                        <div class="text-xs text-gray-secondary">
                            En cliquant sur S’inscrire, vous acceptez nos Conditions générales, 
                            notre Politique de confidentialité et notre Politique d’utilisation des cookies. 
                            Vous recevrez peut-être des notifications par texto de notre part et vous pouvez à tout moment vous désabonner.

                        </div>

                        <BtnInput :loading="useAuth.isLoading" :disabled="v$.$invalid">S'inscrire</BtnInput>
                        
                    </form>

                    <div class="text-center pt-4 border-t border-gray-100">
                        <p class="text-gray-600">
                            Avez-vous un compte ?
                            <router-link 
                                to="/login" 
                                class="text-orange-primary hover:underline font-medium"
                            >
                                Se connecter
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import PasswordInput from '@/components/ui/PasswordInput.vue';
import TextInput from '@/components/ui/TextInput.vue';
import EmailInput from '@/components/ui/EmailInput.vue';
import BtnInput from '@/components/ui/BtnInput.vue';

import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { authValidations } from '@/utils/validators';
import { useToast } from 'vue-toastification';
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';


const useAuth = useAuthStore()

const toast = useToast()

const userForm = ref({
    email : '',
    password : '',
    first_name : '',
    last_name : ''
})

const rules = {
    first_name : authValidations.first_name,
    last_name : authValidations.last_name,
    email : authValidations.email,
    password : authValidations.password
}

const v$ = useVuelidate(rules, userForm)

const router = useRouter()

const handleRegister = async () =>{
    try {
        const isValid = await v$.value.$validate()
        if (!isValid) {
            v$.value.$errors.forEach((error) => {
                toast.error(error.$message)
            })
            return
        }

        const response = await useAuth.register(userForm.value)
        if (response.success) {
            toast.success(response.message || 'Inscription reussie')
            await router.push('/login')
        } else {
            toast.error(response.message || 'Inscription echouée')
        }
    } catch (error) {
        console.error('error', error)
        toast.error('Inscription echouée')
        userForm.value.password = ''
    }
    
    
}

</script>

<style lang="scss" scoped>

</style>