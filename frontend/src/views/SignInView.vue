

<template>
  <div>
    <component :is="currentComponent"></component>
    
    
  </div>
</template>

<script setup>
import SignupForm from '../components/SignupForm.vue';
import {ref} from 'vue'
const currentComponent = ref(SignupForm)

</script>

<style>

</style>