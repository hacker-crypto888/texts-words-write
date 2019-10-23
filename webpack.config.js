const webpack = require('webpack'); // eslint-disable-line no-unused-vars
import path from 'path'; 
const nodeExternals = require('webpack-node-externals');
const fs=require('fs');
import WriteFilePlugin from 'write-file-webpack-plugin';

module.exports = {
  entry: {
    'main': './main.js',
    'index':'./src/index.js',
    'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry',
  },
  mode: 'none',
  output: {
    path: path.join(__dirname, './dist'),
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: {
    "nodeExternals":"require('webpack-node-externals')", 
    "node-helper":"require('node-helper')", 
    "fs":"require('fs')", 
    "path":"require('path')"
    [remainder omitted]
  }, // in order to ignore all modules in node_modules folder
  plugins: [
    new WriteFilePlugin()
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      'fs': 'memfs',
    }
  },
  module: {
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                  presets: ['es2015']
              }
          }
      ]
  },
};
