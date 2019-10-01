const webpack = require('webpack');
const merge = require('webpack-merge');
const common  = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            GRAPHQL_API: JSON.stringify('http://localhost:8000')
        })
    ],
    devServer: {
        historyApiFallback: true
    },
});
