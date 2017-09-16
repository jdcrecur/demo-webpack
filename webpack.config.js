const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable : process.env.NODE_ENV === 'development'
})

module.exports = {
  entry  : './src/index.js',
  output : {
    filename: 'bundle.js',
    path    : path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module : {
    rules  : [
      {
        test: /\.scss$/,
        use : extractSass.extract({
          use     : [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test  : /\.(woff|woff2|eot|ttf|svg)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    extractSass
  ]
}
