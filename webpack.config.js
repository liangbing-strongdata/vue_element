var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    login: './src/js/login.js',
    main: './src/js/main.js'
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'js/[name].js',
    publicPath: 'http://127.0.0.1:18181/'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jp?g|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images/'
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      baseUrl: path.join(__dirname, './src'),
      rootUrl: path.join(__dirname, './node_modules'),
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new CleanPlugin(['dist'], {
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin("css/[name].css"),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/page/login.html'),
      filename: 'login.html',
      hash: true,
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/page/main.html'),
      filename: 'main.html',
      hash: true,
      chunks: ['main']
  }),
  new CopyWebpackPlugin([{
      from: path.join(__dirname + '/api'),
      to: path.join(__dirname, '/dist/api'),
      force: true,
      toType: 'dir'
    }]),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '127.0.0.1',
    compress: true,
    openPage: 'login.html',
    port: 18181
  }

};
