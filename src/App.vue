<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DefaultLayoutVue from '@/components/layout/DefaultLayout.vue'
import RouteLoading from './components/ui/RouteLoading.vue';
import { useLoadingStore } from './stores/loading.store';

const loadingStore = useLoadingStore()

</script>

<template>
  <RouterView />
  <component :is="loadingStore.loaderComponent" v-if="loadingStore.isLoading" />  
</template>

<style scoped>

</style>
