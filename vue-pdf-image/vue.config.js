const { name } = require('./package.json')
const path = require('path')
module.exports = {
    outputDir: path.resolve(__dirname, '../vue-pdf-image-dist'),
    configureWebpack: {
        output: {
            // qiankun微应用必须添加这个---把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`
        }
    },
    devServer: {
        port: '8000',
        proxy: {
            '^/api': {
                target: 'http://cms.ipfz.co:83',
                changeOrigin: true
            }
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}