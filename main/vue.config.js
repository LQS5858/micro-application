
const path = require('path')
module.exports = {
    publicPath: './',
    outputDir: path.resolve(__dirname, '../main-dist'),
    devServer: {
        port: 8000,
    }
}