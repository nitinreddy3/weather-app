'use strict';

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var rootPath = path.join(__dirname);

new webpackUglifyJsPlugin({
    cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
    debug: true,
    minimize: true,
    sourceMap: false,
    output: {
        comments: false
    },
    compressor: {
        warnings: false
    }
})

var sassLoaders = [
    'css-loader',
    'postcss-loader',
    'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './app')
];

module.exports = {
    entry: './app/main.js',
    output: {
        filename: 'javascript/[name]-[hash].min.js',
        path: path.join(__dirname, './build'),
        publicPath: '/'
    },
    module: {
        loaders: [{
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css/,
                loader: 'style-loader!css-loader?name=theme/stylesheets/[name]-[hash].[ext]'
            },
            { test: /\.png|jpg|gif$/, loader: 'file-loader?name=theme/images/[name].[ext]' },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            },
            { test: /\.(woff|woff2|svg|ttf|eot|ico)$/, loader: 'file-loader?name=theme/vendor/fonts/[name].[ext]' }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: 'app/index.template.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new ExtractTextPlugin('theme/stylesheets/[name]-[hash].min.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new CopyWebpackPlugin([{
            from: path.join(rootPath, 'app/theme/images'),
            to: 'theme/default/images'
        }]),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'underscore',
            React: 'react'
        }),
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.sass', '.json'],
        modulesDirectories: ['app', 'node_modules']
    }

}