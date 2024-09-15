import Joi, { type ObjectSchema } from 'joi'
import type { Request, Response, NextFunction } from 'express'

import { Logger } from '#helpers/logger'
import type { IUser } from '#models/user.models'

export const validationSchema = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { value, error } = schema.validate(req.body)

        if (error) {
            Logger.error(error)
            return res.status(422).json({ success: false, msg: error.details[0].message })
        }

        req.body = value
        next()
    }
}

export const schema = {
    user: {
        signup: Joi.object<IUser>({
            name: Joi.string().min(3).max(30).required().messages({
                'string.min': 'Name must be at least 3 characters long',
                'string.max': 'Name must be less than 30 characters long',
                'any.required': 'Name is required'
            }),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
                .required()
                .messages({
                    'string.email': 'Email must be valid',
                    'any.required': 'Email is required'
                }),
            password: Joi.string()
                .min(6)
                .max(20)
                .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,20}$/))
                .required()
                .messages({
                    'string.pattern.base':
                        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                    'string.min': 'Password must be at least 6 characters long',
                    'string.max': 'Password must be less than 20 characters long',
                    'any.required': 'Password is required'
                })
        }),
        emailVerify: Joi.object<IUser>({
            verificationToken: Joi.string().required().messages({
                'any.required': 'Verification token is required'
            })
        }),
        login: Joi.object<IUser>({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
                .required()
                .messages({
                    'string.email': 'Email must be valid',
                    'any.required': 'Email is required'
                }),
            password: Joi.string()
                .min(6)
                .max(20)
                .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{6,20}$/))
                .required()
                .messages({
                    'string.pattern.base':
                        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                    'string.min': 'Password must be at least 6 characters long',
                    'string.max': 'Password must be less than 20 characters long',
                    'any.required': 'Password is required'
                })
        })
    }
}
