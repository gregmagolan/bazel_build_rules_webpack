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
      __main__: 'TEMPLATED_root_dir',
      src: 'TEMPLATED_root_dir/src',
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
