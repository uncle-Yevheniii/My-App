import jwt from 'jsonwebtoken'
import type { Response } from 'express'

import type { IUserModel } from '../models/user.models'

const create = (res: Response, user: IUserModel) => {
    const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

const verify = (token: string, res: Response) => {
    const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''

    const decoded = jwt.verify(token, JWT_SECRET) as IUserModel
    if (!decoded) return res.status(401).json({ success: false, msg: 'Unauthorized - invalid token' })

    const { _id } = decoded
    return _id
}

export default { create, verify }
