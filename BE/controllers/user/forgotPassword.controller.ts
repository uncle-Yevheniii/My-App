// const forgotPassword = async (req: Request, res: Response) => {
//     const { email } = req.body
//     if (!email) return res.status(400).json({ success: false, msg: 'All fields are required' })

//     await User.findOne({ email })
//         .then((user) => {
//             //! not secure
//             if (!user) return res.status(400).json({ success: false, msg: 'User not found' })

//             const resetToken = crypto.randomBytes(32).toString('hex')
//             const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

//             user.resetPasswordToken = resetToken
//             user.resetPasswordExpiresAt = resetTokenExpiresAt
//             return user
//                 .save()
//                 .then(async () => {
//                     await mailtrap.sendForgotPasswordEmail(user.email, resetToken)

//                     res.status(200).json({ success: true, msg: 'Reset password token sent to your email' })
//                 })
//                 .catch((error) => res.status(500).json({ error }))
//         })
//         .catch((error) => res.status(500).json({ error }))
// }
