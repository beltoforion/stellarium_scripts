const path = require('path');

//
// This is the webpack config file.
// It will automatically pack all transpiles js files into a single 
// ssc file for use with stellarium
//

let targetName = path.basename(__dirname); //"UrsaMinor";

module.exports = {
  entry: './' + targetName + '.ts',
  // plugins: [
  //   new webpack.BannerPlugin({ 
  //       banner: "The head comment", 
  //       entryOnly: true 
  //   })
  // ],
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
