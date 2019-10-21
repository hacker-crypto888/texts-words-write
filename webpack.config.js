const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const path = require('path'); 
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
config.node = {fs:'empty'};
module.exports = {
  context: __dirname,
  entry: {
    'main': './main.js',
    'index':'./src/index.js',
    'user':'./src/user.js',
    'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry',
  },
  mode: 'none',
  output: {
    path: path.join(__dirname, '../../build/webpack'),
    publicPath: '../../build/webpack/',
    filename: '[name].bundle.js',
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals(), "node-helper"], // in order to ignore all modules in node_modules folder
  node: {
    fs:'empty'
  }
};
