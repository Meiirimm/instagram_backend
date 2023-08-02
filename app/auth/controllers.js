const sendEmail = require('../utils/sendMail')
const AuthCode = require('./AuthCode')
const User = require('./User')
const Post = require('../post/Post')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const {jwtOptions} = require('./passport')
const fs = require('fs');



const sendVerificationCodeByEmail = async(req, res) => {
    const code = String(Date.now()).slice(-6);


    await AuthCode.create({
        email: req.body.email,
        code: code,
    })

    const emailContent = `
    <!DOCTYPE html>
    <html>
      <body>
        <table border="0" cellspacing="0" cellpadding="0" align="center" id="m_-2594258804584833895m_392281302567507452email_table" style="border-collapse:collapse"><tbody><tr><td id="m_-2594258804584833895m_392281302567507452email_content" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff"><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr><td height="20" style="line-height:20px" colspan="3">&nbsp;</td></tr><tr><td height="1" colspan="3" style="line-height:1px"></td></tr><tr><td><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;text-align:center;width:100%"><tbody><tr><td width="15px" style="width:15px"></td><td style="line-height:0px;max-width:600px;padding:0 0 15px 0"><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr><td style="width:100%;text-align:left;height:33px"><img height="33" src="https://ci4.googleusercontent.com/proxy/vHv3tRtE3I_2w6zR6JFt066OaSywcGpzkuO02W6QMIeOfCWNMc-TyEJKxu4mG2hoBsYBLNnCt6VSzhJNl2kOXcZTRdglv3R20xUvvc29ow=s0-d-e1-ft#https://static.xx.fbcdn.net/rsrc.php/v3/yO/r/Otjcwa2eCOF.png" style="border:0" class="CToWUd" data-bit="iit"></td></tr></tbody></table></td><td width="15px" style="width:15px"></td></tr></tbody></table></td></tr><tr><td><table border="0" width="430" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 auto 0 auto"><tbody><tr><td><table border="0" width="430px" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 auto 0 auto;width:430px"><tbody><tr><td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td></tr><tr><td width="12" style="display:block;width:12px">&nbsp;&nbsp;&nbsp;</td><td><table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse"><tbody><tr><td></td><td style="margin:10px 0 10px 0;color:#565a5c;font-size:18px"><p style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">Hi,</p><p style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">Someone tried to sign up for an Instagram account with <a href="mailto:${req.body.email}" rel="noreferrer" target="_blank">${req.body.email}</a>. If it was you, enter this confirmation code in the app:</p></td></tr><tr><td></td><td style="padding:10px;color:#565a5c;font-size:32px;font-weight:500;text-align:center;padding-bottom:25px">${code}</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td><table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 auto 0 auto;width:100%;max-width:600px"><tbody><tr><td height="4" style="line-height:4px" colspan="3">&nbsp;</td></tr><tr><td width="15px" style="width:15px"></td><td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td><td style="text-align:center"><div style="padding-top:10px;display:flex"><div style="margin:auto"><img src="https://ci4.googleusercontent.com/proxy/EJZbh4o__ilxW-Qeu9CLvNAN7DS93sdYd0ZWHbRbsuZTMeA01I_dPjJ8ksrB2zX5CDoDyOrShH2RhVZy5cghftAAEMZI0T10gEk20cA2OA=s0-d-e1-ft#https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/Bqo9-L659wB.png" height="26" width="52" alt="" class="CToWUd" data-bit="iit"></div><br></div><div style="height:10px"></div><div style="color:#abadae;font-size:11px;margin:0 auto 5px auto">© Instagram. Meta Platforms, Inc., 1601 Willow Road, Menlo Park, CA 94025<br></div><div style="color:#abadae;font-size:11px;margin:0 auto 5px auto">This message was sent to <a style="color:#abadae;text-decoration:underline" rel="noreferrer">${req.body.email}</a>.<br></div></td><td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td><td width="15px" style="width:15px"></td></tr><tr><td height="32" style="line-height:32px" colspan="3">&nbsp;</td></tr></tbody></table></td></tr><tr><td height="20" style="line-height:20px" colspan="3">&nbsp;</td></tr></tbody></table><span><img src="https://ci4.googleusercontent.com/proxy/ChVXEBYA-zaTTBRcPWOQSiKoMXE3R_sZxprtTBanoQotMJqk7d_Gffkf2AZpwjfbEur26bC1eUoIFRtKgHDaQZTa-9-hDOSWlMQu3lEE-Oc39jjcXfZLkIXDvou-ZEFX2TojRaVZ7L6OlDdSEMWwg_add-Ue=s0-d-e1-ft#https://www.facebook.com/email_open_log_pic.php?mid=601c5be831c06G24bc2cdafa4000G601c608191ed8G37f" style="border:0;width:1px;height:1px" class="CToWUd" data-bit="iit"></span></td></tr></tbody></table>
      </body>
    </html>
  `;

    await sendEmail(req.body.email, "Your Instagram code", emailContent)

    res.status(200).send({ message: "Verification code sent to email"})
}

const signUp = async(req, res) => {
    const authCode = await AuthCode.findOne({
        where: {email: req.body.email},
        order: [['id', 'DESC']]
    })

    if (!authCode || authCode.code !== req.body.code) {
        res.status(401).send({ error: "Invalid verification code" });
    } 

    else{
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
}

const logIn = async(req, res) => {
    if(!req.body.user_name || req.body.user_name.length === 0 || !req.body.password || req.body.password.length === 0 ){
        res.status(401).send({message: "Bad Credentials"})
    }else{
        const user = await User.findOne({
            where: {
                user_name: req.body.user_name
            }
        })
        if(!user) return res.status(401).send({message: "User with that email is not exists"})

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(isMatch){
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
}

module.exports = {
    sendVerificationCodeByEmail,
    signUp,
    logIn,
}