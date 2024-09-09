import { client, sender } from './config.service'
import { Logger } from '../../helpers/logger'

const sendVerificationEmail = async (email: string, token: string) => {
    const recipients = [{ email }]

    return await client
        .send({
            from: sender,
            to: recipients,
            subject: 'Verify your email',
            text: `Verify your email ${token}`,
            category: 'email-verification'
        })
        .then((res) => Logger.info(`Email sent: ${JSON.stringify(res)}`))
        .catch((error) => Logger.error(error))
}

const sendWelcomeEmail = async (email: string, name: string) => {
    const recipients = [{ email }]

    return await client
        .send({
            from: sender,
            to: recipients,
            subject: 'Welcome email',
            text: `Welcome ${name}! Verify your email!`,
            category: 'email-welcome'
        })
        .then((res) => Logger.info(`Email sent: ${JSON.stringify(res)}`))
        .catch((error) => Logger.error(error))
}

const sendForgotPasswordEmail = async (email: string, token: string) => {
    const recipients = [{ email }]

    //? demo url
    const url = `http://localhost:3000/reset-password/${token}`

    return await client
        .send({
            from: sender,
            to: recipients,
            subject: 'Forgot your password',
            text: `Forgot your password ${url}`,
            category: 'email-forgot-password'
        })
        .then((res) => Logger.info(`Email sent: ${JSON.stringify(res)}`))
        .catch((error) => Logger.error(error))
}

const sendResetPasswordEmail = async (email: string) => {
    const recipients = [{ email }]

    return await client.send({
        from: sender,
        to: recipients,
        subject: 'Reset your password',
        text: `Reset your password`,
        category: 'email-reset-password'
    })
}

export default { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendForgotPasswordEmail }
