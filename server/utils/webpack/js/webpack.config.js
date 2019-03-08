const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: './js/index.js',
    output: {
        path:path.resolve(__dirname,'./build'),
        filename: 'bundle[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                  
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader",
                  //publicPath:'./build'
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        outputPath:'./img',
                        // 应用 图片的 公共路径
                        publicPath:'./img'
                    }
                  }
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }
           
           
        ]
    },
    plugins: [
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         ie8: true,
        //     },
        // }),
        //new ExtractTextPlugin('index.css'),
        new ExtractTextPlugin({
            filename:'index[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }),
        
    ],
};