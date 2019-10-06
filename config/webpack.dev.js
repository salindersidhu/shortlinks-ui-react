const webpack = require('webpack');
const merge = require('webpack-merge');
const config  = require('./webpack.config.js');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            GRAPHQL_API: JSON.stringify('http://localhost:8000/graphql')
        })
    ],
    devServer: {
        historyApiFallback: true
    },
});
