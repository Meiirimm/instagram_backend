const User = require('./User')


const validateSignUp = async(req, res, next) => {
    let errors = {}
    if(!req.body.email || req.body.email.length === 0){
        errors.email = "Поле Email обязательное"
    }
    if(!req.body.user_name || req.body.user_name.length === 0){
        errors.user_name = "Поле Имя пользователя обязательное"
    }
    if(!req.body.password || req.body.password.length === 0){
        errors.password = "Поле Пароль обязательное"
    }
 

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user){
        errors.email = "Пользователь с таким email уже зарегистрирован"
    }

    if(JSON.stringify(errors) !== JSON.stringify({})) res.status(400).send(errors)
    else next()

}  

module.exports = {
    validateSignUp,
}