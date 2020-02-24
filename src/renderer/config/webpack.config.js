module.exports = {
    target: 'electron-renderer',
    output: {
        path: __dirname + '/../../../dist/renderer',
        publicPath: '',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                    compact: false
                },
            }
        ]
    }
};
