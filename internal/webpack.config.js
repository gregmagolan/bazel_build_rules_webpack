const webpack = require('webpack');
const path = require('path');

console.log("Building in", path.resolve());

var webpackConfig = {
  target: 'TEMPLATED_target',
  entry: {
    'TEMPLATED_name': 'TEMPLATED_entry_point',
  },
  resolve: {
    alias: {
      src: 'TEMPLATED_root_dir/src',
      'node_modules/@angular/animations/index': '@angular/animations',
      'node_modules/@angular/animations/browser/index': '@angular/animations/browser',
      'node_modules/@angular/core/index': '@angular/core',
      'node_modules/@angular/common/index': '@angular/common',
      'node_modules/@angular/common/http/index': '@angular/common/http',
      'node_modules/@angular/forms/index': '@angular/forms',
      'node_modules/@angular/http/index': '@angular/http',
      'node_modules/@angular/router/index': '@angular/router',
      'node_modules/@angular/platform-browser/index': '@angular/platform-browser',
      'node_modules/@angular/platform-browser/animations/index': '@angular/platform-browser/animations',
      'node_modules/@angular/platform-server/index': '@angular/platform-server',
    }
  },
  output: {
    filename: 'TEMPLATED_output'
  },
  module: {
    rules: [
    ]
  },
};

module.exports = webpackConfig;
