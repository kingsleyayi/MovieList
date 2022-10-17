const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config()

const MovieRoute = require('./routes/movie')
const AuthRoute = require('./routes/auth')
mongoose.connect(process.env.DB_URL_ATLAS)
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Cinnection Established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/movie', MovieRoute)
app.use('/api', AuthRoute)

