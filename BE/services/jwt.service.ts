import jwt from 'jsonwebtoken'
import type { Response } from 'express'
import type mongoose from 'mongoose'

const create = (res: Response, user: { _id: mongoose.Types.ObjectId }) => {
    const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export default { create }
