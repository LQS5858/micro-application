const fs = require('fs')
const express = require('express')
const app = express()
const port = 8080

app.use(express.static('main-dist'))

app.get('*', (req, res) => {
    fs.readFile('./main-dist/index.html', 'utf-8', (err, html) => {
        res.send(html)
    })
})

app.listen(port, () => {
    console.log(`main app listening at http://localhost:${port}`)
})