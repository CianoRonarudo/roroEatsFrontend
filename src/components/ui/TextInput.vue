<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="inputId"
      type="text"
      :placeholder="placeholder"
      v-model="internalValue"
      @input="$emit('update:modelValue', internalValue)"
      class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-primary"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String
})

const internalValue = ref(props.modelValue || '')

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

const inputId = `text-input-${Math.random().toString(36).substring(2, 10)}`
</script>
