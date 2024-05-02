<script setup>
    import { RouterLink } from 'vue-router';

    const routes = [
        { 
            name : "Home",
            path: '/'
        }, {
            name: "About",
            path: '/about'
        }, {
            name: "Products",
            path: '/products'
        }, {
            name: "SignIn",
            path: '/signin'
        }
    ]

</script>

<template>
    <nav>
        <div class='desktop-view'>
            <div></div>
            <div class="link-list" >
                <router-link v-for="route in routes" :to="route.path"  >{{route.name}}</router-link>
            </div>
            <div></div>
        </div>
        
        <div class="mobile-view">
            <div class="link-list" >
                <router-link v-for="route in routes" :to="route.path"  >{{route.name}}</router-link>
            </div>
        </div>
    </nav>
</template>


<style>

nav{
    @apply w-full p-5 text-sm rounded-3xl shadow-xl font-medium text-zinc-500 fixed max-lg:bottom-5 lg:top-5
}
.link-list{
    @apply flex gap-5 
}

nav > div a.router-link-exact-active {
    @apply text-zinc-950 
}

nav > div a:hover {
    @apply text-zinc-800
}

nav > .desktop-view {
    @apply  max-lg:hidden
}

nav > .mobile-view {
    @apply lg:hidden
}

</style>