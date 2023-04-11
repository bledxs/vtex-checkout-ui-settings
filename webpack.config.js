const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: ['./src/index.js', './src/index.scss'],
    output: {
      path: path.resolve(__dirname, './checkout-ui-custom'),
      filename: 'checkout6-custom.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'checkout6-custom.css',
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        isProduction ? new TerserPlugin({ extractComments: false }) : false,
        new CssMinimizerPlugin(),
      ].filter(Boolean),
    },
  }
}
