const path  = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独分离打包css
const srcRoot =  path.resolve(__dirname, 'src');

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

const config = {
  mode: 'development',
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test:/\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude:/node_modules/
      },
      {
        test: /\.css$/,
        use:[
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use:[
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'resources/[name].[ext]'
          }
        }],
        include: srcRoot
      }
    ]
  },
  plugins:[
   // html模板
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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