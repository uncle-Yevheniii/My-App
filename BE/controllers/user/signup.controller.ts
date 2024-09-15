import mongoose from 'mongoose'

import type { Response, Request } from 'express'

import User from '#models/user.models'
import { Logger } from '#helpers/logger'
import { createHashService } from '#services/bcrypt.service'
import { createTokenAndSetCookie } from '#services/jwt.service'
import { createVerificationToken } from '#helpers/createVerificationToken'

export default async function signup(req: Request, res: Response) {
    try {
        const { email, password, name } = req.body
        if (!email || !password || !name) return res.status(400).json({ success: false, msg: 'All fields are required' })

        const exists = await User.findOne({ email })
        if (exists) return res.status(400).json({ success: false, msg: 'User already exists' })

        const verificationToken = createVerificationToken()
        const hash = await createHashService(password)

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            password: hash,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save()

        createTokenAndSetCookie(res, user)

        //! send verification email
        Logger.warn(`Verification token: ${verificationToken})}`)

        return res.status(201).json({
            success: true,
            msg: 'User created successfully',
            user: { ...user.toObject(), password: undefined }
        })
    } catch (err) {
        Logger.error(err)
        return res.status(500).json({ err })
    }
}
