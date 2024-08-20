<template>
    <div class="container">
        <Card class="p-5 h-30rem w-25rem">
            <template #title>
                <h1 style="text-align: center;">Login</h1>
                <div v-if="errorMessage" class="error-text mb-2" style="text-align: center;">{{ errorMessage }}</div>
            </template>
            <template #content>
                <div class="flex flex-column justify-content-evenly align-items-center">
                    <FloatLabel class="mb-5 mt-3">
                        <InputText id="username" size="large" v-model="form.username"/>
                        <label for="username">Username</label>
                    </FloatLabel>
                    <FloatLabel class="mb-5">
                        <InputText id="password" type="password" size="large" v-model="form.password" @change="validatePassword"/>
                        <label for="password">Password</label>
                    </FloatLabel>
                    <Button type="submit" size="large" class="mt-2" @click="login">Login</Button>
                    <router-link to="/register" class="mt-4">create account</router-link>
                </div>
            </template>
        </Card>
    </div>
</template>
<script setup lang="ts">
    import AuthService from "../services/auth/AuthService"
    import { useToken } from "../composables/useToken"
    import { useRouter } from "vue-router"

    const router = useRouter()
    const form = reactive<{
        username: string | undefined;
        password: string | undefined;
    }>({
        username: undefined,
        password: undefined,
    })

    const validity = reactive<{
        username: boolean | undefined;
        password: boolean | undefined;
    }>({
        username: undefined,
        password: undefined,
    })

    const service = new AuthService();
    const { setToken, isTokenExpired } = useToken();

    let errorMessage = ref("")

    const validatePassword = () => {
        validity.password = form.password !== undefined && form.password.length > 0;
    };

    const login = async () => {
        if (!form.username || !form.password) {
            console.error("username and password are required")
            errorMessage.value = "username and password are required"
            return;
        }
        try {
            const response = await service.login(form.username, form.password)
            if (response.status !== 200) {
                console.error(response.data.detail)
                errorMessage.value = response.data.detail
                return;
            }
            setToken(response.data.token)
            router.push({ name: "app" })
        } catch (error: any) {
            errorMessage.value = error.response.data.message
            console.error(error)
        }
        }

    onBeforeMount(() => {
        if (!isTokenExpired()) {
            router.push({ name: "app" })
        }
    })
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: rgb(41, 41, 41);
    }
    .error-text {
        color: red;
        font-size: 1rem;
        font-weight: 400;
    }
</style>