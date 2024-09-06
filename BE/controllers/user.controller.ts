import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User, { type IUserModel } from '../models/user.models'
import { mailtrapClient, sender } from '../mailtrap/mailtrap.config'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body
    if (!email || !password || !name) return res.status(400).json({ message: 'All fields are required' })

    await User.findOne({ email })
        .then((user) => user && res.status(400).json({ message: 'User already exists' }))
        .catch((error) => res.status(500).json({ error }))

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hash,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    })

    user.save()
        .then((user) => {
            const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ''

            const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' })

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            const recipients = [{ email: user.email }]
            mailtrapClient.send({
                from: sender,
                to: recipients,
                subject: 'Verify your email',
                text: `Your verification code is: ${verificationToken}`,
                category: 'Email verification'
            })

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
const login = async (req: Request, res: Response) => {}
const logout = async (req: Request, res: Response) => {}

export default { signup, login, logout }
