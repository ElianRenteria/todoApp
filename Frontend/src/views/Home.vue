<script setup lang="ts">
</script>

<template>
    <div class="container">
        <nav class="w-full p-5 flex justify-content-end align-items-center">
            <div class="w-15rem flex justify-content-around">
                <router-link to="/login" >Login</router-link>
                <router-link to="/register">SignUp</router-link>
            </div>
        </nav>
        <h1>Home</h1>
        <p>Welcome to the Home page</p>
    </div>
</template>
<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: rgb(73, 73, 73);
    }
</style>
