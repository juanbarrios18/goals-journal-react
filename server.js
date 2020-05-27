const express = require('express')
const path = require('path')
const port = process.env.PORT || 4000
const app = express()

app.use(express.static(path.join(__dirname, '/dist')))

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port)
