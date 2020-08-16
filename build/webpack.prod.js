const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcRoot = path.resolve(__dirname, '..', 'src');
const distPath = path.resolve(__dirname, '..', 'dist');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
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
    path: distPath,
    filename: '[name].[hash:8].js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: srcRoot,
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
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
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial', //对node_modules中所有模块进行抽离
          name: 'vendor',
          minSize: 0,
          minChunks: 1,
          priority: 10,
        },
        common: {
          name: 'common',
          test: /[\\/]src[\\/]/,
          chunks: 'all',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
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

    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
    }),
  ],
};
