import mongoose from 'mongoose'
import { Logger } from '../helpers/logger'

const MONGO_PWD = process.env.MONGO_PWD ? process.env.MONGO_PWD : ''
const MONGO_USERNAME = process.env.MONGO_USERNAME ? process.env.MONGO_USERNAME : ''

const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PWD}@cluster-qe6qzxn4pjhqk0f.ta2sn.mongodb.net/?retryWrites=true&w=majority&appName=cluster-QE6QzxN4pjhqK0F86Xsm`

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        Logger.info(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        Logger.error(err)
        process.exit(1)
    }
}
