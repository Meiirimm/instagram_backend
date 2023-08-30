const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {jwtOptions} = require('./passport')
const sendEmail = require('../utils/sendMail')
const AuthCode = require('./AuthCode')
const User = require('./User')

// Отправка верификационного кода на указанный email, это для регистрации
const sendVerificationCodeByEmail = async(req, res) => {
    try {
        // Генерация верификационного кода
        const code = String(Date.now()).slice(-6);

        // Создание записи о верификационном коде в базе данных
        await AuthCode.create({
            email: req.body.email,
            code: code,
        })
    
        // Отправка верификационного кода по электронной почте
        await sendEmail(req.body.email, "Your Instagram code", code)
    
        res.status(200).send({ message: "Verification code sent to email"})    
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });  
    }
}

// Регистрация нового пользователя
const signUp = async(req, res) => {
    try {
        // Поиск верификационного кода пользователя
        const authCode = await AuthCode.findOne({
            where: {email: req.body.email},
            order: [['id', 'DESC']]
        })
    
        // Проверка верификационного кода
        if (!authCode || authCode.code !== req.body.code) {
            res.status(401).send({ error: "Invalid verification code" });
        } 
    
        else{
            // Хеширование пароля и создание пользователя
            let user = await User.findOne({where: {email: req.body.email}});
    
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
            if(!user){
                user = await User.create({
                    email: req.body.email,
                    user_name: req.body.user_name,
                    password: hashedPassword,
                    full_name: req.body.full_name,
                })    
            }
        }
        res.status(200).send({ message: "Registration successful"});    
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });  
    }
}

// Вход пользователя в систему
const logIn = async(req, res) => {
    try {
        // Поиск пользователя по имени пользователя (логину)
        if(!req.body.user_name || req.body.user_name.length === 0 || !req.body.password || req.body.password.length === 0 ){
            res.status(401).send({message: "Bad Credentials"})
        }else{
            const user = await User.findOne({
                where: {
                    user_name: req.body.user_name
                }
            })
            if(!user) return res.status(401).send({message: "User with that email is not exists"})
    
            // Сравнение хешированного пароля
            const isMatch = await bcrypt.compare(req.body.password, user.password);
    
            if(isMatch){
                // Генерация JWT-токена при успешном входе
                const token = jwt.sign({ 
                    id: user.id, 
                    email: user.email, 
                    user_name: user.user_name,
                }, jwtOptions.secretOrKey, {
                    expiresIn: 24 * 60 * 60 * 365
                });
    
                res.status(200).send({token});
            }else{
                res.status(401).send({message: "Password is incorrect"})
            }
        }    
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });  
    }
}

module.exports = {
    sendVerificationCodeByEmail,
    signUp,
    logIn,
}