import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'

import { connectDB } from './db/connect'
import { router as userRouter } from './routes/user.route'
import { Logger } from './helpers/logger'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

/** Routes **/
const prefix = '/api'
app.use(`${prefix}/users`, userRouter)

/** Start Server **/
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

http.createServer(app).listen(PORT, () => {
    connectDB()
    Logger.info(`Server is listening on port ${PORT}`)
})
