<script setup lang="ts">
import router from '../router';
</script>

<template>
    <div class="container">
        <h1>Home</h1>
        <p>Welcome to the Home page</p>
        <nav>
            <router-link to="/login">Login</router-link>
            <router-link to="/SignUp">SignUp</router-link>
        </nav>
    </div>
</template>
<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: rgb(73, 73, 73);
    }
</style>
