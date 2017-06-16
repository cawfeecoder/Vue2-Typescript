const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleVisualizerPlugin = require('webpack-visualizer-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
      app: [
        './index.ts'
      ]
    },
    output: {
        path: __dirname,
        filename: './dist/assets/js/[name].bundle.min.js'
    },
    resolve : {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.vue', '.html'],
        alias: {
          'vue$': 'vue/dist/vue.common.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },

    module: {
        rules: [
            { test: /\.(ts|tsx)$/,
              exclude: '/node_modules|vue\/src/',
              use: ['babel-loader', 'awesome-typescript-loader'],
            },
            { test: /\.(vue)$/,
              exclude: '/node_modules/',
              use: [{loader: 'babel-loader'}, {loader: 'vue-loader', options: { esModule: true } } ],
            },
            { test: /\.(js|jsx)$/,
              use: ['babel-loader'],
              exclude: '/node_modules/'
            },
            { test: /\.(css)$/,
              use: ['style-loader', 'css-loader?module'],
              exclude: '/node_modules/'
            },
            {
              test: /\.styl$/,
              use: ['style-loader', 'css-loader?module', 'stylus-loader'],
              exclude: /node_modules/
            },
            {
              test: /\.html$/,
              use: [{loader: 'vue-template-loader', options: {hmr: false} }],
              exclude: '/src/index.html'
            },
            {
              test: /\.(eot|svg|ttf|otf|woff|woff2)$/,
              use: 'file-loader?public/fonts/[name].[ext]'
            }
        ]
    },
    devServer: {
      host: "0.0.0.0",
      port: process.env.PORT || 8080,
      public: process.env.PORT || null,
      historyApiFallback: true,
      compress: true,
      contentBase: path.resolve(__dirname, './dist'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'node-static',
        filename: './dist/assets/js/node-static.min.js',
        minChunks(module, count) {
          var context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        minChunks: Infinity,
        threshold: 10240,
        minRatio: 0.8
      }),
      new CopyWebpackPlugin([
           { from: 'index.html', to: './dist/' },
           { from: 'style.css', to: './dist/assets/styles' }
      ]),
      new BundleVisualizerPlugin(),
      new BrowserSyncPlugin(
      {
        host: "0.0.0.0",
        port: process.env.PORT || "8080",
        proxy: `http://0.0.0.0:${process.env.PORT}`
      },
      {
        reload: false
      })
    ],
    devtool: 'source-map'
}
