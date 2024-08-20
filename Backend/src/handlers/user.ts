import prisma from '../db'
import { comparePassword, hashPassword } from '../middleware/auth'
import { createJWT } from '../middleware/auth'

export const createNewUser = async (req: any, res: any) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await(hashPassword(req.body.password)),
                name: req.body.name ? req.body.name : null
            }
        });
    
        const token = createJWT(user)
        res.json({token})
    } catch (e) {
        res.status(400)
        res.json({message: 'User already exists'})
        return
    }
}

export const authenticate = async (req: any, res: any) => {
    res.json({"username":req.user.username, "name":req.user.name, "id":req.user.id})
    return
}

export const signIn = async (req: any, res: any) =>{
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        }
    });

    if (!user){
        res.status(401)
        res.json({message: 'Username does not exist'})
        return
    }

    const isValid  = await comparePassword(req.body.password, user.password)

    if (!isValid){
        res.status(401)
        res.json({message: 'Password is incorrect'})
        return
    }

    const token = createJWT(user)
    res.json({ token })
}

export const logOut = async (req: any, res: any) => {
    res.json({message: 'Logged out'})
}

export const getTodoList = async (req: any, res: any) => {
    const todoList = await prisma.todoItem.findMany({
        where: {
            userId: req.user.id
        }
    })
    res.json(todoList)
    return
}

export const changeName = async (req: any, res: any) => {
    if (!req.body.name){
        res.status(400)
        res.json({message: 'name is required'})
        return
    }
    const user = await prisma.user.update({
        where: {
            id: req.user.id
        },
        data: {
            name: req.body.name
        }
    })
    res.json(user)
    return
}

export const changePassword = async (req: any, res: any) => {
    if (!req.body.password){
        res.status(400)
        res.json({message: 'password is required'})
        return
    }
    const user = await prisma.user.update({
        where: {
            id: req.user.id
        },
        data: {
            password: await hashPassword(req.body.password)
        }
    })
    res.json(user)
    return
}