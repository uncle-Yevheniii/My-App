// const resetPassword = async (req: Request, res: Response) => {
//     const { token } = req.params
//     const { password } = req.body
//     if (!token) return res.status(400).json({ success: false, msg: 'Token or password is required' })

//     await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } })
//         .then(async (user) => {
//             if (!user) return res.status(400).json({ success: false, msg: 'Invalid or expired token' })

//             const hash = await bcrypt.create(password)
//             user.password = hash
//             user.resetPasswordToken = undefined
//             user.resetPasswordExpiresAt = undefined

//             return user
//                 .save()
//                 .then(async () => {
//                     await mailtrap.sendResetPasswordEmail(user.email)

//                     res.status(200).json({ success: true, msg: 'Reset password successful' })
//                 })
//                 .catch((error) => res.status(500).json({ error }))
//         })
//         .catch((error) => res.status(500).json({ error }))
// }
