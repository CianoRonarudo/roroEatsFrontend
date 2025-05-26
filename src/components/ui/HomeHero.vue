<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Navbar -->
    <nav 
      ref="navbar"
      class="fixed w-full z-50 py-6 opacity-0 transform -translate-y-full transition-all duration-300"
    >
      <div class="container mx-auto px-6 flex justify-between items-center">
        <!-- Partie Logo (gauche) -->
        <div class="flex-1">
          <router-link 
            to="/" 
            id="logo"
            class="text-2xl font-bold text-white mix-blend-difference hover:text-orange-primary transition-colors duration-300"
          >
            RoroEats
          </router-link>
        </div>

        <!-- Partie Liens centraux -->
        <div 
          ref="navLinks"
          class="hidden md:flex flex-1 justify-center space-x-8"
        >
          <router-link 
            v-for="(item, index) in navItems" 
            :key="item.name" 
            :to="item.path"
            :data-index="index"
            class="nav-link text-white mix-blend-difference hover:text-orange-primary transition-colors duration-300 relative"
          >
            {{ item.name }}
          </router-link>
        </div>

        <!-- Partie Authentification (droite) -->
        <div class="flex-1 flex justify-end">
          <router-link
            to="/login"
            class="text-white mix-blend-difference hover:text-orange-primary transition-colors duration-300"
          >
            Connexion
          </router-link>
          <router-link
            to="/register"
            class="ml-4 px-4 py-2 bg-orange-primary text-white rounded hover:bg-orange-600 transition-colors duration-300"
          >
            Inscription
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div 
      class="hero-home h-full w-full flex items-center justify-center text-center px-4"
      ref="hero"
    >
      <div class="max-w-4xl mx-auto text-white">
        <h1 
          ref="heroTitle" 
          class="text-4xl md:text-6xl font-bold mb-6 opacity-0 scale-90"
        >
          Découvrez des saveurs exceptionnelles
        </h1>
        <p 
          ref="heroSubtitle" 
          class="text-xl md:text-2xl mb-8 opacity-0 scale-90"
        >
          Livraison de plats gastronomiques directement chez vous
        </p>
        <button 
          ref="heroButton"
          class="bg-orange-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 opacity-0 scale-90"
        >
          Commander maintenant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const navbar = ref(null)
const navLinks = ref(null)
const heroTitle = ref(null)
const heroSubtitle = ref(null)
const heroButton = ref(null)

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Notre carte', path: '/' },
  { name: 'Pâtiserie', path: '/' },
  { name: 'Jus Naturels', path: '/' },
  { name: 'Service traiteur', path: '/' },
  { name: 'Contact', path: '/' }
]

onMounted(() => {
  const tl = gsap.timeline()

  // Animation de la navbar seulement
  tl.to(navbar.value, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
  })

  // Animation des éléments du hero
  tl.to([heroTitle.value, heroSubtitle.value, heroButton.value], {
    scale: 1,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "back.out(1.7)"
  }, "-=0.5")

  // Animation des liens de navigation
  if (navLinks.value) {
    tl.from(
      navLinks.value.querySelectorAll('.nav-link'),
      {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "circ.out"
      },
      "-=0.3"
    )
  }

  // Effets au scroll
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    const nav = navbar.value

    if (y > 50) {
      nav.classList.add('scrolled-nav')
      gsap.to(nav, {
        backgroundColor: 'white',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        duration: 0.3
      })
      gsap.to('.nav-link, #logo, [to="/login"], [to="/register"]', {
        color: '#3E2C24',
        mixBlendMode: 'normal',
        duration: 0.3
      })
    } else {
      nav.classList.remove('scrolled-nav')
      gsap.to(nav, {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        duration: 0.3
      })
      gsap.to('.nav-link, #logo, [to="/login"], [to="/register"]', {
        color: 'white',
        mixBlendMode: 'difference',
        duration: 0.3
      })
    }
  })
})
</script>

<style scoped>
.hero-home {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('@/assets/img/hero-home.jpg') no-repeat center center / cover;
}

nav {
  will-change: transform, opacity, background-color;
}

.nav-link {
  will-change: transform, opacity, color;
  position: relative;
}

/* Style pour le lien actif */
.router-link-active:not(#logo) {
  color: #F97316 !important;
  font-weight: 600;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #F97316;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.router-link-active.nav-link::after {
  width: 100%;
}

/* Adaptation pour le scroll */
.scrolled-nav .nav-link::after {
  background-color: #3E2C24;
}

.scrolled-nav .router-link-active.nav-link::after {
  background-color: #F97316;
}
</style>