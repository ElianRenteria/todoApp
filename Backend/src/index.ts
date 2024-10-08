import express from 'express'
import router from './router'
import cors from 'cors'
import morgan from 'morgan'
import { protect } from './middleware/auth'
import { createNewUser, signIn, logOut } from './handlers/user'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()


// MIDDLEWARE
app.use(cors({
	origin: '*', // Replace with your frontend URL
  	methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.options('*', cors())

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api', protect, router)
app.post('/signup', createNewUser)
app.post('/signin', signIn)
app.post('/logout', logOut)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})



