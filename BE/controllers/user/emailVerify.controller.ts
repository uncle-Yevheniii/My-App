import type { Response, Request } from 'express'

import User from '#models/user.models'
import { Logger } from '#helpers/logger'

export default async function emailVerify(req: Request, res: Response) {
    try {
        const { verificationToken } = req.body
        if (!verificationToken) return res.status(400).json({ success: false, msg: 'All fields are required' })

        const user = await User.findOne({ verificationToken, verificationTokenExpiresAt: { $gt: Date.now() } })
        if (!user) return res.status(400).json({ success: false, msg: 'Invalid or expired verification token' })
        //TODO: if token expired

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined

        await user.save()

        //! send welcome email
        Logger.warn(`Email sent: ${JSON.stringify(user)}`)

        res.status(200).json({
            success: true,
            msg: 'User verified successfully',
            user: { ...user.toObject(), password: undefined }
        })
    } catch (err) {
        Logger.error(err)
        return res.status(500).json({ err })
    }
}
