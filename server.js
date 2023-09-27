const express = require('express')
const logger = require('morgan')
const passport = require('passport');
const cors = require("cors")



const app = express();

app.use(logger('dev'))
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use(passport.initialize());

app.use(express.static(__dirname + "/public"))

require('./app/auth/passport')


app.use(require('./app/auth/routes'))
app.use(require('./app/post/routes'))
app.use(require('./app/user/routes'))
app.use(require('./app/story/routes'))
app.use(require('./app/comment/routes'))
app.use(require('./app/like/routes'))


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})