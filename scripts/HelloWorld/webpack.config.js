const path = require('path');

//
// This is the webpack config file.
// It will automatically pack all transpiled ts files into a single 
// SSC file for use with Stellarium
//

let targetName = path.basename(__dirname); 

module.exports = {
  entry: './' + targetName + '.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: targetName + '.ssc',
    path: path.resolve(__dirname, '.')
  }
};
