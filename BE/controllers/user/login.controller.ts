import type { Response, Request } from 'express'

import User from '#models/user.models'
import { Logger } from '#helpers/logger'
import { compareHashService } from '#services/bcrypt.service'
import { createTokenAndSetCookie } from '#services/jwt.service'

export default async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ success: false, msg: 'All fields are required' })

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ success: false, msg: 'Invalid email or password' })
        if (!user.isVerified) return res.status(400).json({ success: false, msg: 'Please verify your email' })

        const compareHash = await compareHashService(password, user.password)
        if (!compareHash) return res.status(400).json({ success: false, msg: 'Invalid email or password' })

        user.lastLogin = new Date()
        await user.save()

        createTokenAndSetCookie(res, user)

        res.status(200).json({
            success: true,
            msg: 'User logged in successfully',
            user: { ...user.toObject(), password: undefined }
        })
    } catch (err) {
        Logger.error(err)
        return res.status(500).json({ err })
    }
}
