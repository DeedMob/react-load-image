import path from 'path';
import webpack from 'webpack';

export default {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'standalone'),
    filename: 'react-imageloader.js',
    library: 'ReactImageLoader',
    libraryTarget: 'umd',
  },
  target: 'web',
  externals: ['React', {react: 'React'}],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
