require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const connectDB = require('./config/databaseConnection')
const corsOptions = require('./config/corsOptions')
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(logger)
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/', express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/root.js'))
app.use('/users', require('./routes/userRoutes'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (error) => {
  console.log(error)
  logEvents(
    `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
    'mongoErrLog.log'
  )
})
