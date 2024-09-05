import express from 'express'

import controllers from '../controllers/user.controller'

export const router = express.Router()

router.get('/signup', controllers.signup)
router.get('/login', controllers.login)
router.get('/logout', controllers.logout)
