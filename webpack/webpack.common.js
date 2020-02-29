const path = require('path');

const ENTRY = path.resolve(__dirname, 'client', 'src', 'index.jsx');
const OUTPUT_PATH = path.resolve(__dirname, 'client', 'public');
const OUTPUT_FILENAME = 'bundle.js';

module.exports = {
  entry: ENTRY,
  output: {
    path: OUTPUT_PATH,
    filename: OUTPUT_FILENAME,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'client', 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
