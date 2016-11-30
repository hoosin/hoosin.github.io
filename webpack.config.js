var webpack = require('webpack')
var path = require('path');


module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'}
        ]
    }
}