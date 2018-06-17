const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    target: 'electron',

    externals: {
        bindings: 'require("bindings")',
        serialport: 'require("serialport")'
    },

    entry: './app/src/entry.js',

    output: {
        path: __dirname + '/app/build',
        publicPath: 'build/',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'env',
                        'react',
                        'stage-2'
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg|ico|eot|ttf|woff)$/,
                loader: 'file-loader?limit=100000',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        })
    ]
}
