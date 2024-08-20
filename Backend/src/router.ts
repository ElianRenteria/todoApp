import Router from 'express'
import { getTodoList, changeName, changePassword, authenticate } from './handlers/user'
import { createTodo, deleteTodo, updateTodoCompleted, updateTodoTitle } from './handlers/todo'
const router = Router()

// Auth Test
router.get('/', (req, res) => {
    res.json({message: 'auth sucess'})
    return;
})
// User
router.get('/user/todolist', getTodoList)
router.post('/user/name', changeName)
router.post('/user/password', changePassword)
router.post('/me', authenticate)

// todoItem
router.post('/item', createTodo)
router.delete('/item', deleteTodo)
router.put('/item/title', updateTodoTitle)
router.put('/item/completed', updateTodoCompleted)

export default router