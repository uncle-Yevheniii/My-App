import express from 'express'
import dotenv from 'dotenv'

import { connectDB } from './db/connect'
import { Logger } from './helpers/logger'

dotenv.config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    connectDB()
    Logger.info(`Server is listening on port ${PORT}`)
})
