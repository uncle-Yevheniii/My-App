import { MailtrapClient } from 'mailtrap'

const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN ? process.env.MAILTRAP_TOKEN : ''

export const client = new MailtrapClient({ token: MAILTRAP_TOKEN })

export const sender = {
    email: 'mailtrap@demomailtrap.com',
    name: 'my-app'
}
