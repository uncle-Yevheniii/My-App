import jwt from 'jsonwebtoken'
import type { Response } from 'express'

import type { DecodedToken } from 'types/decoded'
import type { IUserModel } from '#models/user.models'

export function createTokenAndSetCookie(res: Response, user: IUserModel) {
    const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export function verifyToken(token: string) {
    const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken

    return decoded
}
