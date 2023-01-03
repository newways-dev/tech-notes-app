const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOptions')
const app = express()

const PORT = process.env.PORT || 5000

// Middleware
app.use(logger)
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root.js'))

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
