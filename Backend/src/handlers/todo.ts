import prisma from '../db'

export const createTodo = async (req: any, res: any) => {
    if (!req.body.title){
        res.status(400)
        res.json({message: 'title is required'})
        return
    }
    const Todo = await prisma.todoItem.create({
        data: {
            title: req.body.title,
            completed: false,
            userId: req.user.id
        }
    });
    res.json(Todo)
    return
}

export const deleteTodo = async (req: any, res: any) => {
    if (!req.body.id){
        res.status(400)
        res.json({message: 'id is required'})
        return
    }
    try {
        const Todo = await prisma.todoItem.delete({
            where: {
                id: req.body.id
            }
        });
        res.json(Todo)
        return
    } catch (e) {
        res.status(400)
        res.json({message: 'not found'})
        return
    }
}

export const updateTodoTitle = async (req: any, res: any) => {
    if (!req.body.id){
        res.status(400)
        res.json({message: 'id is required'})
        return
    }
    if (!req.body.title){
        res.status(400)
        res.json({message: 'title is required'})
        return
    }
    try {
        const Todo = await prisma.todoItem.update({
            where: {
                id: req.body.id
            },
            data: {
                title: req.body.title
            }
        });
        res.json(Todo)
        return
    } catch (e) {
        res.status(400)
        res.json({message: 'not found'})
        return
    }
}

export const updateTodoCompleted = async (req: any, res: any) => {
    if (!req.body.id){
        res.status(400)
        res.json({message: 'id is required'})
        return
    }
    if (!req.body.completed){
        res.status(400)
        res.json({message: 'completed is required'})
        return
    }
    try {
        const Todo = await prisma.todoItem.update({
            where: {
                id: req.body.id
            },
            data: {
                completed: req.body.completed
            }
        });
        res.json(Todo)
        return
    } catch (e) {
        res.status(400)
        res.json({message: 'not found'})
        return
    }
}


