import type { Request, Response, NextFunction } from 'express'

import { Logger } from '#helpers/logger'
import { verifyToken } from '#services/jwt.service'

export async function verifyCookieToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token
        if (!token) return res.status(401).json({ success: false, msg: 'Unauthorized - no token provided' })

        const decoded = verifyToken(res, token)
        if (!decoded) return res.status(401).json({ success: false, msg: 'Unauthorized - invalid token' })

        req.body = decoded
        next()
    } catch (err) {
        Logger.error(err)
        return res.status(500).json({ err })
    }
}
