const app = require('../app')
const { connectMongo } = require('../db/connection')

require('dotenv').config()

const PORT = process.env.PORT || 8080

const start = async() => {
  try {
    await connectMongo()

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
  }
}

start()
