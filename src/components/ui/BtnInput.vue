<template>
  <button
    type="submit"
    :disabled="disabled || loading"
    :class="[
      'btn-input',
      {
        'opacity-75 cursor-not-allowed': disabled,
        'hover:bg-orange-600 transform hover:scale-[1.02] active:scale-95': !disabled && !loading,
        'bg-gray-300': disabled && !useDefaultColor,
        'cursor-wait': loading
      }
    ]"
    class="w-full text-white py-3 px-4 rounded-md transition-all duration-200 font-medium flex items-center justify-center"
    :style="computedStyles"
  >
    <template v-if="loading">
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ loadingText || text }}
    </template>
    <template v-else>
      <slot>{{ text }}</slot>
    </template>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'Valider'
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Chargement...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  useDefaultColor: {
    type: Boolean,
    default: true
  },
  bgColor: {
    type: String,
    default: '#f26a1b' // orange-primary
  },
  hoverColor: {
    type: String,
    default: '#D85B15' // orange-tertiary
  }
})

const computedStyles = computed(() => ({
  backgroundColor: props.disabled 
    ? props.useDefaultColor ? props.bgColor : ''
    : props.bgColor,
  '--hover-color': props.hoverColor
}))
</script>

<style scoped>
.btn-input {
  background-color: v-bind('props.bgColor');
}

.btn-input:not(:disabled):not(.disabled):hover {
  background-color: var(--hover-color);
}
</style>