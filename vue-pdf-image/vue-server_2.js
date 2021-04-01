const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const port = 8000

// 设置跨域
app.use(cors())
app.use(express.static(path.resolve('../', 'vue-pdf-image-dist')))

app.get('*', (req, res) => {
    fs.readFile(path.resolve('../', 'vue-pdf-image-dist/index.html'), 'utf-8', (err, html) => {
        res.send(html)
    })
})

app.listen(port, () => {
    console.log(`vue app listening at http://localhost:${port}`)
})