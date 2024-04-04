import express from 'express'
import {  googleCallback, googleLogin, loginSuccess,  logout, } from '../Controllers/userController.js'
import { verifyUser } from '../MiddleWares/authMiddleware.js'


const router = express.Router()

router.route('/auth/google').get(googleLogin)
router.route('/auth/google/callback').get(googleCallback)
router.route('/login/success').get(loginSuccess)
router.route("/logout").post(verifyUser,logout)


export default router
