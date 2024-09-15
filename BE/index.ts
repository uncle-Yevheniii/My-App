import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import express, { type Request, type Response } from 'express'

import { connectDB } from './db/connect'
import { Logger } from './helpers/logger'
import { router as userRouter } from './routes/user.route'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

/** Ping Server **/
app.get('/health', (_: Request, res: Response) => res.status(200).json({ success: true, msg: 'Server is up and running' }))

/** Routes **/
const prefix = '/api'
app.use(`${prefix}/users`, userRouter)

app.all('*', (_: Request, res: Response) => res.status(404).json({ success: false, msg: 'Page not found' }))

/** Start Server **/
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

http.createServer(app).listen(PORT, () => {
    connectDB()
    Logger.info(`Server is listening on port ${PORT}`)
})
