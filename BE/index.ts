import express from 'express'
import dotenv from 'dotenv'
import http from 'http'

import { connectDB } from './db/connect'
import { router as userRouter } from './routes/user.route'
import { Logger } from './helpers/logger'

dotenv.config()

const app = express()
app.use(express.json())

/** Routes **/
const prefix = '/api'
app.use(`${prefix}/auth`, userRouter)

/** Start Server **/
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

http.createServer(app).listen(PORT, () => {
    connectDB()
    Logger.info(`Server is listening on port ${PORT}`)
})
