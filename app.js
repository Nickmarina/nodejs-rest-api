const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contactsRouter')
const authRouter = require('./routes/api/authRouter')
// const avatarsRouter = require('./routes/api/avatarsRouter)

const { errorHandler } = require('./helpers/apiHelper')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)
// app.use('/api/avatars', avatarsRouter)
app.use(errorHandler)

module.exports = app
