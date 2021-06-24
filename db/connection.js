const mongoose = require('mongoose')
require('dotenv').config()

const connectMongo = () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}
mongoose.connection.on('connected', () => console.log('Database connection successful'))
mongoose.connection.on('error', (err) => console.log(`Mangoose connection error: ${err.message}`))
mongoose.connection.on('disconnected', () => console.log('Disconnected'))
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and app terminated')
    process.exit(1)
  })
})

module.exports = {
  connectMongo
}
