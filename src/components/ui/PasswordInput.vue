<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="showPassword ? 'text' : 'password'"
        v-model="internalValue"
        @input="$emit('update:modelValue', internalValue)"
        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary"
        :placeholder="placeholder"
      />
      <button
        type="button"
        @click="togglePassword"
        class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
      >
        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" class="text-lg"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: '' // Affiche un label seulement s'il est fourni
  },
  placeholder: {
    type: String,
    default: 'Mot de passe'
  }
})

const internalValue = ref(props.modelValue)
watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal
})

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const inputId = `password-input-${Math.random().toString(36).substring(2, 10)}`
</script>
