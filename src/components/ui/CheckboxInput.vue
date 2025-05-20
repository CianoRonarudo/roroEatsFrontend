<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :id="inputId"
      v-model="internalValue"
      @change="$emit('update:modelValue', internalValue)"
      class="w-4 h-4 text-orange-primary border-gray-300 rounded focus:ring-orange-primary"
    />
    <label :for="inputId" class="ml-2 text-sm text-gray-700">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  label: String
})

const internalValue = ref(props.modelValue || false)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

const inputId = `checkbox-input-${Math.random().toString(36).substring(2, 10)}`
</script>
