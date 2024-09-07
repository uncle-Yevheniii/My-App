import mongoose from 'mongoose'
import type { Request, Response } from 'express'

import bcrypt from '../services/bcrypt.service'
import User from '../models/user.models'
import jwt from '../services/jwt.service'
import mailtrap from '../services/mailtrap/email.service'

const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body
    if (!email || !password || !name) return res.status(400).json({ message: 'All fields are required' })

    await User.findOne({ email })
        .then((user) => user && res.status(400).json({ message: 'User already exists' }))
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

    user.save()
        .then(async (user) => {
            jwt.create(res, user.id)
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
const login = async (req: Request, res: Response) => {}
const logout = async (req: Request, res: Response) => {}

export default { signup, login, logout }
