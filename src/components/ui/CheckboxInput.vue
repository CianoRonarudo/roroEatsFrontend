<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :id="inputId"
      v-model="internalValue"
      @change="handleChange"
      class="custom-checkbox"
      :class="{ 'disabled': disabled }"
      :disabled="disabled"
    />
    <label :for="inputId" class="ml-2 text-sm text-gray-700 cursor-pointer">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  label: String,
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue || false)
const inputId = computed(() => `checkbox-${Math.random().toString(36).substring(2, 9)}`)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

const handleChange = () => {
  emit('update:modelValue', internalValue.value)
}
</script>

<style scoped>
.custom-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 2px solid #E0E0E0; /* gray-secondary */
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.custom-checkbox:hover:not(.disabled) {
  border-color: #F26AF2; /* orange-primary */
}

.custom-checkbox:checked {
  background-color: #F26AF2; /* orange-primary */
  border-color: #F26AF2;
}

.custom-checkbox:checked::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0.25rem;
  height: 0.5rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -60%) rotate(45deg);
}

.custom-checkbox:focus-visible {
  box-shadow: 0 0 0 3px rgba(242, 106, 242, 0.3); /* orange-primary with opacity */
}

.custom-checkbox.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>