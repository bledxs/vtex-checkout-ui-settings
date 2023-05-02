const path = require('path')

const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: ['./src/index.ts', './src/index.scss'],
    output: {
      path: path.resolve(__dirname, './checkout-ui-custom'),
      filename: 'checkout6-custom.js',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: './tsconfig.json',
          baseUrl: './src',
          extensions: ['.ts', '.js'],
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
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
      minimizer: [isProduction ? new TerserPlugin({ extractComments: false }) : false, new CssMinimizerPlugin()].filter(
        Boolean
      ),
    },
  }
}
