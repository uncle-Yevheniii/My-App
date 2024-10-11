// import nodemailer from 'nodemailer'

// import type { IUserModel } from '#models/user.models'

// export class Email {
//     to: string
//     name: string
//     verificationToken: string
//     from: string
//     mailtrapHost: string
//     mailtrapPort: string
//     mailtrapUser: string
//     mailtrapPass: string
//     mailgunHost: string
//     mailgunUser: string
//     mailgunPass: string
//     mailgunPort: string

//     constructor(user: IUserModel, verificationToken: string) {
//         this.to = user.email
//         this.name = user.name
//         this.verificationToken = verificationToken

//         this.from = 'My-App <my-app@example.com>'

//         this.mailtrapHost = process.env.MAILTRAP_HOST ? process.env.MAILTRAP_HOST : ''
//         this.mailtrapPort = process.env.MAILTRAP_PORT ? process.env.MAILTRAP_PORT : ''
//         this.mailtrapUser = process.env.MAILTRAP_USER ? process.env.MAILTRAP_USER : ''
//         this.mailtrapPass = process.env.MAILTRAP_PASS ? process.env.MAILTRAP_PASS : ''

//         this.mailgunHost = process.env.MAILGUN_HOST ? process.env.MAILGUN_HOST : ''
//         this.mailgunPort = process.env.MAILGUN_PORT ? process.env.MAILGUN_PORT : ''
//         this.mailgunUser = process.env.MAILGUN_USER ? process.env.MAILGUN_USER : ''
//         this.mailgunPass = process.env.MAILGUN_PASS ? process.env.MAILGUN_PASS : ''
//     }

//     private _initTransport() {
//         const emailTransport =
//             process.env.NODE_ENV === 'development'
//                 ? {
//                       host: this.mailgunHost,
//                       port: Number(this.mailgunPort),
//                       auth: { user: this.mailgunUser, pass: this.mailgunPass }
//                   }
//                 : {
//                       host: this.mailtrapHost,
//                       port: Number(this.mailtrapPort),
//                       auth: { user: this.mailgunUser, pass: this.mailgunPass }
//                   }

//         return nodemailer.createTransport(emailTransport)
//     }

//     private async _send(subject: string, text: string) {
//         const emailConfig = {
//             from: this.from,
//             to: this.to,
//             subject,
//             text
//         }
//         console.log(emailConfig)
//         console.log(this.mailtrapHost)
//         console.log(this.mailtrapPort)
//         console.log(this.mailtrapPass)
//         console.log(this.mailtrapUser)

//         return await this._initTransport().sendMail(emailConfig)
//     }

//     async sendVerificationToken() {
//         const text = `Please use the following link to verify your account: ${this.verificationToken}`
//         await this._send('Account Verification', text)
//     }

//     async sendHello() {
//         const text = `Hello ${this.name}!`
//         await this._send('Hello new user!', text)
//     }
// }
