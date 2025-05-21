<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="showPassword ? 'text' : 'password'"
        :value="modelValue"
        @input="handleInput"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-primary focus:ring-orange-primary"
        
        :class="{ 
          'border-gray-300': !error,
          'border-red-secondary': error,
          'pr-10': showToggleButton
        }"
        :placeholder="placeholder"
        autocomplete="off"
        @blur="$emit('blur')"
      />
      <button
        v-if="showToggleButton"
        type="button"
        @click="togglePassword"
        class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
        :aria-label="showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'"
      >
        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'" class="text-lg"></i>
      </button>
    </div>
    <transition name="fade">
      <p v-if="error" class="text-red-secondary text-sm mt-1 animate-fade-in">
        {{ error }}
      </p>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: {
    type: String,
    default: 'Mot de passe'
  },
  error: String,
  showToggleButton: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const showPassword = ref(false)
const inputId = computed(() => `password-input-${Math.random().toString(36).substring(2, 10)}`)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>