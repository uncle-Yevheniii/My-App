import { Request } from 'express'

export interface DecodedToken {
    _id: string
    iat: number
    exp: number
}

declare module 'express-serve-static-core' {
    interface Request {
        decoded?: DecodedToken
    }
}
