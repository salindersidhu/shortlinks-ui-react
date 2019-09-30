const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index_bundle.js'
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".json", '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js*/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
