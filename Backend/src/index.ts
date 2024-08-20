import express from 'express'
import router from './router'
import cors from 'cors'
import morgan from 'morgan'
import { protect } from './middleware/auth'
import { createNewUser, signIn } from './handlers/user'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signIn)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})



