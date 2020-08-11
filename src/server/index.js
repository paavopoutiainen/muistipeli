const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.static('src/client'));
app.use('/cssFiles', express.static('src/client'))
app.use('/scripts', express.static('src/client'))

const server = app.listen(port, () => console.log(`Muistipeli app listening on port ${port}!`))

