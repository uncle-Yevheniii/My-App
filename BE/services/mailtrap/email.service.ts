import { client, sender } from './config.service'
import { Logger } from '../../helpers/logger'

const sendVerificationEmail = async (email: string, token: string) => {
    const recipients = [{ email }]

    await client
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

export default { sendVerificationEmail }
