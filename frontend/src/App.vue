<script setup>
import Navbar from './components/navbar/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app">
    <Navbar />      
    <router-view />
    <Footer />
  </div>
</template>

<style scoped>

</style>
