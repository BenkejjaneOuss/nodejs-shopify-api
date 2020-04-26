const express = require('express')
const Cors = require('cors')

const app = express()

require('dotenv').config()

app.use(Cors())

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening to requests on port: ${port}`))