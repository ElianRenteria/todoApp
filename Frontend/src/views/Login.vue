<template>
    <div class="container">
        <Card class="p-5 h-30rem w-25rem">
            <template #title>
                <h1 style="text-align: center;">Login</h1>
            </template>
            <template #content>
                <div class="flex flex-column justify-content-evenly align-items-center">
                    <FloatLabel class="my-5">
                        <InputText id="username" size="large"/>
                        <label for="username">Username</label>
                    </FloatLabel>
                    <FloatLabel class="mb-5">
                        <InputText id="password" type="password" size="large"/>
                        <label for="password">Password</label>
                    </FloatLabel>
                    <Button type="submit" size="large">Login</Button>
                </div>
            </template>
        </Card>
    </div>
</template>
<style scoped>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: rgb(41, 41, 41);
    }
</style>