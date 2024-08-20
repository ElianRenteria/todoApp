<template>
    <div class="container">
        <Card class="p-5 h-35rem w-25rem">
            <template #title>
                <h1 style="text-align: center;" class="my-2">Sign Up</h1>
                <div v-if="errorMessage" class="error-text mt-2 mb-3" style="text-align: center;">{{ errorMessage }}</div>
            </template>
            <template #content>
                <div class="flex flex-column justify-content-evenly align-items-center">
                    <FloatLabel class="mb-5 mt-2">
                        <InputText id="name" size="large" v-model="form.name"/>
                        <label for="name">name</label>
                    </FloatLabel>
                    <FloatLabel class="mb-5">
                        <InputText id="username" size="large" v-model="form.username"/>
                        <label for="username">Username</label>
                    </FloatLabel>
                    <FloatLabel class="mb-5">
                        <InputText id="password" type="password" size="large" v-model="form.password"/>
                        <label for="password">Password</label>
                    </FloatLabel>
                    <FloatLabel class="mb-5">
                        <InputText id="confirm_password" type="password" size="large" v-model="form.confirm_password"/>
                        <label for="confirm_password">Confirm Password</label>
                    </FloatLabel>
                    <Button type="submit" size="large" class="mt-1" @click="signup">Register</Button>
                    <router-link to="/" class="mt-3">Home</router-link>
                </div>
            </template>
        </Card>
    </div>
</template>
<script setup lang="ts">
    import AuthService from '../services/auth/AuthService'
    import { useToken } from '../composables/useToken'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    let errorMessage = ref("")
    const form = reactive({
        name: "",
        username: "",
        password: "",
        confirm_password: ""
    })

    const service = new AuthService()
    const { setToken, isTokenExpired } = useToken();

    const signup = async () => {
        if (!form.username || !form.password || !form.confirm_password) {
            errorMessage.value = "Please fill all fields"
            return
        }
        if (form.password !== form.confirm_password) {
            errorMessage.value = "Passwords do not match"
            return
        }
        try {
            const response = await service.register(form.name, form.username, form.password)
            if (response.status == 400) {
                const message = response.data.message
                console.error("Registration Error: ", message)
                errorMessage.value = message
                return
            } else if (response.status == 200) {
                console.log("Registration Successful")
                setToken(response.data.token)
                //errorMessage.value = "Registration Successful"
                router.push({ name: "login" })
            } else {
                console.error("An Unknown Error Occurred")
            }
        } catch (error: any) {
            console.error(error)
            if (error.response) {
                console.error("Registration Error: ", error.response.data.message)
                errorMessage.value = error.response.data.message
            }
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
        font-size: .85rem;
        font-weight: 300;
    }
</style>