import express from 'express'

import controllers from '../controllers/user.controller'

export const router = express.Router()

router.post('/signup', controllers.signup)

router.post('/email-verify', controllers.verify)

router.post('/forgot-password', controllers.forgotPassword)

router.post('/login', controllers.login)

router.get('/logout', controllers.logout)
