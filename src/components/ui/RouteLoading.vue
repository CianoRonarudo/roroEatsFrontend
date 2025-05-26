<template>
  <div class="fixed inset-0 flex items-center justify-center bg-white-primary z-[100]">
    <div class="text-center">
      <!-- Logo -->
      <img
        ref="logoEl"
        src="@/assets/img/logo-transparent.png" 
        alt="Logo"
        class="w-32 h-32 mx-auto mb-4"
      >
      
      <!-- Texte avec span pour les points -->
      <p class="text-gray-primary/80 text-lg font-medium">
        Chargement<span ref="dotsEl">...</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const logoEl = ref(null)
const dotsEl = ref(null)
let ctx
let dotsInterval

onMounted(() => {
  if (!logoEl.value || !dotsEl.value) return

  ctx = gsap.context(() => {
    // Animation du logo avec vérification
    if (logoEl.value) {
      gsap.to(logoEl.value, {
        opacity: 0.3,
        scale: 0.95,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }

    // Animation des points sécurisée
    const animateDots = () => {
      if (!dotsEl.value) return
      const dots = dotsEl.value.textContent.match(/\./g)?.length || 0
      dotsEl.value.textContent = '.'.repeat((dots % 3) + 1)
    }
    
    const dotsInterval = setInterval(animateDots, 250)
    
    onUnmounted(() => {
      clearInterval(dotsInterval)
    })
  })
})

onUnmounted(() => {
  ctx?.revert()
  clearInterval(dotsInterval)
})
</script>