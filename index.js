const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path');

const port = process.env.PORT || 3001

app.use(cors())
app.use(express.static('public'));
app.use('/cssFiles', express.static('public'))
app.use('/scripts', express.static('public'))

/*
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})
*/
const server = app.listen(port, () => console.log(`Muistipeli app listening on port ${port}!`))

