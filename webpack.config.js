const webpack = require('webpack');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', path.join(__dirname, 'js', 'index.js')],
  },

  output: {
    path: path.join(__dirname, 'public', 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/build/',
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: 'http://localhost:8080/build/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env', 'stage-2'],
        },
      },
      {
        test: /\.(scss|css|sass)$/,
        use: [
          {
            loader: require.resolve('style-loader'),
          },
          {
            loader: require.resolve('css-loader'),
          },
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
        query: {
          limit: '10000',
          mimetype: 'application/octet-stream',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('file-loader'),
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('svg-url-loader'),
        query: {
          limit: '10000',
          mimetype: 'application/svg+xml',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        query: {
          limit: 8192,
        },
      },
      {
        test: /\.ico(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('url-loader'),
      },
    ],
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp('^(fs|ipc)$')),
  ],

  performance: {
    hints: false,
  },
};
