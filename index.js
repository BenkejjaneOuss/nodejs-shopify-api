const express = require('express')
const Cors = require('cors')

const shopify = require('./routes/shopify')

const app = express()

require('dotenv').config()
app.use(Cors())

app.use('/shopify', shopify)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening to requests on port: ${port}`))