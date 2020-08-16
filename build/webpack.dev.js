const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcRoot = path.resolve(__dirname, '..', 'src');

const devPath = path.resolve(__dirname, '..', 'dev');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: devPath,
    hot: true,
  },
  entry: {
    index: path.join(srcRoot, 'pages', 'index', 'index.tsx'),
    detail: path.join(srcRoot, 'pages', 'detail', 'detail.tsx'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      component: path.resolve(srcRoot, 'components'),
    },
  },

  output: {
    path: devPath,
    filename: '[name].min.js',
  },
  devtool: 'source-map', //配置sourceMap
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
        include: srcRoot,
      },
      {
        test: /\.scss$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 38,
              remPrecision: 8, //小数点精确的位数
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: srcRoot + '/components/common.scss',
            },
          },
        ],
        include: srcRoot,
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: ['url-loader?limit=8192'], //小于8k的转base64
        include: srcRoot,
      },
      {
        test: /\.(js|jsx)$/,
        loader: ['babel-loader'], //小于8k的转base64
        include: srcRoot,
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: ['ts-loader'], //小于8k的转base64
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all', //对node_modules中所有模块进行抽离
          name: 'common',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcRoot, 'pages', 'index', 'index.html'),
      filename: 'index.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ['common', 'index'], // 只引用 index.js
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcRoot, 'pages', 'detail', 'detail.html'),
      filename: 'detail.html',
      // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
      chunks: ['common', 'detail'], // 只引用 index.js
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
