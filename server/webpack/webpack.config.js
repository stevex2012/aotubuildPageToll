const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//动态获取输出路径 ===== 
module.exports = {
    entry: './src/index.js',
    output: {
        filename: './build/bundle.js',
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
                        outputPath:'./build/img',
                        // 应用 图片的 公共路径
                        publicPath:'./img'
                    }
                  }
                ]
            }
           
           
        ]
    },
    plugins: [
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         ie8: true,
        //     },
        // }),
        new ExtractTextPlugin('build/index.css'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './build/index.html'
        }),
        
    ],
};