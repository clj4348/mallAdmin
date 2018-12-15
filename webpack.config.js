const path  = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

const config = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/app.js'
  },
  module: {
    rules: [
      // jsx文件的处理
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      // css文件的处理
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      // scss文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      // 图片的配置
      {
        test: /\.(png|jpg|gif)$/,
        use:[
          {
            loader: 'url-loader',
            options:{
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      // 字体图标的配置
      {
        test:/\.(eot|svg|ttf|woff|woff2|otf)$/,
        use:[
          {
            loader: 'url-loader',
            options:{
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins:[
   // html模板
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // css单独编译处理
    new ExtractTextWebpackPlugin("css/[name].css"), 
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    })
  ],
  // 别名
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src/page'),
      'image': resolve('src/assets/img'),
      'service':  resolve('src/service'),
      'component': resolve('src/component'),
      'util': resolve('src/util')
    }
  },
  devServer: {
    port: 8086,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {        
       '/api': {
            target: 'http://adminv2.happymmall.com',
            changeOrigin: true,   //允许跨域
            pathRewrite: {
              '^/api': ''
            }
        }
    }
  }
}
module.exports = config;