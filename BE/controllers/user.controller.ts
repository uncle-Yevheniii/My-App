import crypto from 'crypto'
import mongoose from 'mongoose'
import type { Request, Response } from 'express'

import bcrypt from '../services/bcrypt.service'
import User from '../models/user.models'
import jwt from '../services/jwt.service'
import mailtrap from '../services/mailtrap/email.service'

const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body
    if (!email || !password || !name) return res.status(400).json({ success: false, msg: 'All fields are required' })

    await User.findOne({ email })
        .then((user) => user && res.status(400).json({ success: false, msg: 'User already exists' }))
        .catch((error) => res.status(500).json({ error }))

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
    const hash = await bcrypt.create(password)

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hash,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    })

    return user
        .save()
        .then(async (user) => {
            jwt.create(res, user)
            await mailtrap.sendVerificationEmail(email, verificationToken)

            res.status(201).json({
                success: true,
                msg: 'User created successfully',
                user: {
                    ...user.toObject(),
                    password: undefined
                }
            })
        })
        .catch((error) => res.status(500).json({ error }))
}

const verify = async (req: Request, res: Response) => {
    const { token } = req.body
    if (!token) return res.status(400).json({ success: false, msg: 'All fields are required' }) //edit err msg

    await User.findOne({ verificationToken: token, verificationTokenExpiresAt: { $gt: Date.now() } })
        .then((user) => {
            if (!user) return res.status(400).json({ success: false, msg: 'Invalid or expired verification token' })
            //! if not found user with this token expired

            user.isVerified = true
            user.verificationToken = undefined
            user.verificationTokenExpiresAt = undefined
            return user
                .save()
                .then(async (user) => {
                    await mailtrap.sendWelcomeEmail(user.email, user.name)

                    res.status(200).json({ success: true, msg: 'User verified successfully', user })
                })
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ success: false, msg: 'All fields are required' })

    await User.findOne({ email })
        .then(async (user) => {
            if (!user) return res.status(400).json({ success: false, msg: 'Invalid email or password' })

            if (!user.isVerified) return res.status(400).json({ success: false, msg: 'Please verify your email' })

            await bcrypt
                .compare(String(password), user.password)
                .then((isMatch) => {
                    if (!isMatch) return res.status(400).json({ success: false, msg: 'Invalid email or password' })
                })
                .catch((error) => res.status(500).json({ error }))

            user.lastLogin = new Date()
            return user
                .save()
                .then((user) => {
                    jwt.create(res, user.id)

                    res.status(200).json({
                        success: true,
                        msg: 'User logged in successfully',
                        user: {
                            ...user.toObject(),
                            password: undefined
                        }
                    })
                })
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

const logout = async (req: Request, res: Response) => {
    res.clearCookie('token')
    res.status(200).json({ success: true, msg: 'User logged out successfully' })
}

const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body
    if (!email) return res.status(400).json({ success: false, msg: 'All fields are required' })

    await User.findOne({ email })
        .then((user) => {
            //! not secure
            if (!user) return res.status(400).json({ success: false, msg: 'User not found' })

            const resetToken = crypto.randomBytes(32).toString('hex')
            const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

            user.resetPasswordToken = resetToken
            user.resetPasswordExpiresAt = resetTokenExpiresAt
            return user
                .save()
                .then(async () => {
                    await mailtrap.sendForgotPasswordEmail(user.email, resetToken)

                    res.status(200).json({ success: true, msg: 'Reset password token sent to your email' })
                })
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body
    if (!token) return res.status(400).json({ success: false, msg: 'Token or password is required' })

    await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } })
        .then(async (user) => {
            if (!user) return res.status(400).json({ success: false, msg: 'Invalid or expired token' })

            const hash = await bcrypt.create(password)
            user.password = hash
            user.resetPasswordToken = undefined
            user.resetPasswordExpiresAt = undefined

            return user
                .save()
                .then(async () => {
                    await mailtrap.sendResetPasswordEmail(user.email)

                    res.status(200).json({ success: true, msg: 'Reset password successful' })
                })
                .catch((error) => res.status(500).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

const checkAuth = async (req: Request, res: Response) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ success: false, msg: 'Unauthorized - no token provided' })

    const decodedUserId = jwt.verify(token, res)

    return await User.findById(decodedUserId)
        .then((user) => {
            if (!user) return res.status(401).json({ success: false, msg: 'Unauthorized - invalid token' })

            res.status(200).json({
                success: true,
                msg: 'User authenticated',
                user: {
                    ...user.toObject(),
                    password: undefined
                }
            })
        })
        .catch((error) => res.status(500).json({ error }))
}

export default { signup, login, logout, verify, forgotPassword, resetPassword, checkAuth }
