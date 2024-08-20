<template>
    <div class="container">
        <div class="px-5 pt-1 pb-1 w-full flex justify-content-between align-items-center">
            <h1 class="m-3">TodoList App</h1>
            <Button @click="logout" severity="danger"><i class="pi pi-sign-out" style="font-size: 1rem"></i> Signout</Button>
        </div>
        <div v-if="showPopup" class="popup-overlay">
            <Card class="p-0">
                <template #title>
                    <div class="flex flex-row justify-content-end m-0 p-0"><Button severity="danger" text @click="closePopup"><i class="pi pi-times" style="font-size: 1.4rem"></i></Button></div>
                    <h3 style="text-align: center;" class="pb-3 m-2">Add Todo</h3>
                    <div v-if="errorMessage2" class="error-text mt-2 mb-3" style="text-align: center;">{{ errorMessage2 }}</div>
                </template>
                <template #content>
                    <form @submit.prevent="submitForm">
                        <div class="flex flex-column justify-content-evenly align-items-center">
                            <FloatLabel class="mb-5 mt-3">
                                <InputText id="title" size="large" v-model="form.title" />
                                <label for="name">Name</label>
                            </FloatLabel>
                            <!-- The button now becomes a submit button -->
                            <Button type="submit" size="large" class="mb-2" severity="success">
                                Create
                            </Button>
                        </div>
                    </form>
                </template>
            </Card>
        </div>
        <h2>welcome back {{ name }}</h2>
        <div class="m-0 mb-5 p-0 w-full h-full flex flex-column justify-content-start align-items-center">
            <Card class="w-10 h-full">
                <template #content>
                    <div class="addTodo w-full flex justify-content-between align-items-center">
                        <Button class="ml-2 mb-3" severity="info" @click="markTodo"><i class="pi pi-check"></i></Button>
                        <div>
                            <Button class="mr-2 mb-3" severity="danger" @click="deleteTodo"><i class="pi pi-trash"></i></Button>
                            <Button class="mr-1 mb-3" severity="success" @click="showPopup = true"><i class="pi pi-plus"></i></Button>
                        </div>
                    </div>
                    <div class="list">
                        <div v-if="errorMessage" class="error-text mt-2 mb-3" style="text-align: center;">{{ errorMessage }}</div>
                        <DataTable v-model:selection="selectedTodo" sortField="completed" :sortOrder="1" selectionMode="single" dataKey="id" :value="todoList_display" stripedRows tableStyle="width: 100%" class="m-5" size="large">
                            <Column field="title" header="Name" style="width: 80%" sortable></Column>
                            <Column field="completed" header="Status" style="width: 20%" sortable></Column>
                        </DataTable>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>
<script setup lang="ts">
    import AuthService from "../services/auth/AuthService"
    import { useToken } from "../composables/useToken"
    import { useRouter } from 'vue-router'

    
    const router = useRouter()

    const service = new AuthService()
    const { isTokenExpired, getToken } = useToken();
    const errorMessage = ref("")
    const errorMessage2 = ref("")
    const todoList: any = ref<any[]>([])
    const todoList_display: any = ref<any[]>([])
    const name = ref<any>("")
    const showPopup = ref(false)
    const selectedTodo = ref<any>(null)

    const form = ref({
        title: ''
    });

    function update_todoList_display() {
        todoList_display.value = []
        for (const todo of todoList.value) {
            todoList_display.value.push({
                id: todo.id,
                title: todo.title,
                completed: todo.completed ? '✔️' : ' ',
                done: todo.completed
            })
        }
    }

    const submitForm = async () => {
        try {
            if (!form.value.title) {
                errorMessage2.value = "Please add a title"
                return
            }
            const token = getToken();
            if (token) {
                await service.createTodo(token, form.value.title)
                todoList.value = await service.fetchWithToken(token)
                update_todoList_display()
                form.value.title = ''
                errorMessage2.value = ""
            } else {
                 new Error('No valid token found')
            }
        } catch (error: any) {
            errorMessage.value = error.message || 'Failed to create todo'
        }
        showPopup.value = false
    }

    const deleteTodo = async () => {
        try {
            if (!selectedTodo.value) {
                errorMessage.value = "Please select a todo item"
                return
            }
            const token = getToken();
            if (token) {
                await service.removeTodo(token, selectedTodo.value.id)
                todoList.value = await service.fetchWithToken(token)
                update_todoList_display()
                errorMessage.value = ""
                selectedTodo.value = null
            } else {
                 new Error('No valid token found')
            }
        } catch (error: any) {
            errorMessage.value = error.message || 'Failed to delete todo'
        }
    }

    const markTodo = async () => {
        try {
            if (!selectedTodo.value) {
                errorMessage.value = "Please select a todo item"
                return
            }
            const token = getToken();
            if (token) {
                await service.markTodo(token, selectedTodo.value.id, selectedTodo.value.done)
                todoList.value = await service.fetchWithToken(token)
                update_todoList_display()
                errorMessage.value = ""
                selectedTodo.value = null
            } else {
                 new Error('No valid token found')
            }
        } catch (error: any) {
            errorMessage.value = error.message || 'Failed to update todo'
        }
    }

    function closePopup() {
        errorMessage2.value = ""
        showPopup.value = false
    }

    function logout () {
        localStorage.removeItem('access_token')
        service.logout()
        router.push({ name: "login" })
    }

    onMounted(async () => {
        try {
            const token = getToken()
            if (token) {
                todoList.value = await service.fetchWithToken(token)
                update_todoList_display()
                name.value = await service.getUser(token)
            } else {
                 new Error('No valid token found')
            }
        } catch (error: any) {
            errorMessage.value = error.message || 'Failed to fetch todo list'
        }
    });


    onBeforeMount(() => {
        if (isTokenExpired()) {
            router.push({ name: "login" })
        }
    })
</script>
<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: rgb(41, 41, 41);
    }
    .error-text {
        color: red;
        font-size: 1rem;
        font-weight: 300;
    }
    h1 {
        color: white;
        font-weight: 400;
    }
    h2 {
        color: white;
        font-weight: 300;
    }
    h3 {
        font-weight: 400;
    }
    .p-card-content {
        overflow: scroll;
    }
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .list {
        overflow: auto;
    }
</style>