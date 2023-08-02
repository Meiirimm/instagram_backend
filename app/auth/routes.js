const express = require('express')
const router = express.Router();
const {sendVerificationCodeByEmail, signUp, logIn} = require('./controllers')
const {validateSignUp} = require('./middlewares')


router.post('/api/auth/sendmail' , sendVerificationCodeByEmail)
router.post('/api/auth/signup' , validateSignUp,  signUp)
router.post('/api/auth/login',   logIn)

module.exports = router;