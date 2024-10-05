import type { Request, Response } from 'express'

export default function logout(_: Request, res: Response) {
    res.clearCookie('token')
    res.status(200).json({ success: true, msg: 'User logged out successfully' })
}
