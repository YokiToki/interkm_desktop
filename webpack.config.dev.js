const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    watch: true,
    target: 'electron-main',
    devtool: 'source-map',
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
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ]
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|ico|eot|ttf|woff)$/,
                use: [{loader: 'file-loader'}],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ]
};
