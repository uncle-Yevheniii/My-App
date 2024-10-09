import express from 'express'

import { Routes } from './route'
import { uploadAvatar } from '#middlewares/uploadAvatar.middleware.ts'
import { verifyCookieToken } from '#middlewares/verifyCookieToken.middleware'
import { schema, validationSchema } from '#middlewares/validation.middleware'
import { signup, emailVerify, login, checkAuth, logout, update } from '#controllers/index'

export const router = express.Router()

router.post(Routes.LOGIN, validationSchema(schema.user.login), login)
router.post(Routes.SIGNUP, validationSchema(schema.user.signup), signup)
router.post(Routes.EMAIL_VERIFY, validationSchema(schema.user.emailVerify), emailVerify)

router.get(Routes.LOGOUT, logout)
router.get(Routes.CHECK_AUTH, verifyCookieToken, checkAuth)

router.patch(Routes.UPDATE, verifyCookieToken, uploadAvatar, update)

// router.get('/logout', controllers.logout)
// router.post('/email-verify', controllers.verify)
// router.post('/forgot-password', controllers.forgotPassword)
// router.post('/reset-password/:token', controllers.resetPassword)
