<template>
  <div class="w-full space-y-1">
    <label 
      v-if="label" 
      :for="inputId" 
      class="block text-sm font-medium text-gray-900"
    >
      {{ label }}
      <span v-if="required" class="text-red-secondary">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="inputId"
        type="email"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :required="required"
        autocomplete="off"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-primary focus:ring-orange-primary"
        :class="{
          'border-red-secondary': error,
          'pr-8': $slots.icon
        }"
        @blur="$emit('blur')"
      />
      
      <!-- Slot pour icône optionnelle -->
      <div v-if="$slots.icon" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <slot name="icon"></slot>
      </div>
    </div>
    
    <transition name="fade">
      <p 
        v-if="error" 
        class="mt-1 text-sm text-red-secondary animate-fade-in"
      >
        {{ error }}
      </p>
    </transition>
    
    <p v-if="hint && !error" class="mt-1 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: {
    type: String,
    default: ''
  },
  error: String,
  hint: String,
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const inputId = computed(() => `text-input-${Math.random().toString(36).substring(2, 9)}`)

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-3px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>