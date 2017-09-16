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
    rules: [
      // Run all files ending .js or .jsx through the babel loader
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      // Run all files ending .scss through the css/sass/style loader with the extract plugin.
      // The extract plugin extracts the output from the main bundle.js and into a css file
      {
        test: /\.scss$/,
        use : extractSass.extract({
          use     : [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      // Writes the fonts to their own folder, relative the source directory
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use : 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    extractSass
  ]
}
