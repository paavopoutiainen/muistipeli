const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');

const port = process.env.PORT || 3001

app.use(cors())
app.use(express.static('client'));
app.use('/cssFiles', express.static('client'))
app.use('/scripts', express.static('client'))

const server = app.listen(port, () => console.log(`Muistipeli app listening on port ${port}!`))

