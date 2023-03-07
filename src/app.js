const express = require('express')

const handleResponses =  require('./utils/handleResponses')
const db = require('./utils/database')
const initModels = require('./models/initModels')
const config = require('../config').api


const userRouter = require('./users/user.router')
const authRouter = require('./auth/auth.router')


const app = express()

app.use(express.json())


db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Database Synced'))
    .catch(err => console.log(err))

initModels()

app.get('/', (req, res) => {
    responseHandlers.success({
        res,
        status: 200,
        message: 'Servidor inicializado correctamente',
        data: {
            "users": `${config.host}/api/v1/users`
        } 
    })
})


app.use('/api/v1/users', userRouter )
app.use('/api/v1/auth', authRouter)


app.use('*', (req, res) => {
    handleResponses.error({
        res,
        status: 404,
        message: 'URL not found'
    })
})
app.listen( config.port, () => {
    console.log(`Server started at port ${config.port}`);
})
