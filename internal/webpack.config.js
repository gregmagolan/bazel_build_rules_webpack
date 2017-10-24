const webpack = require('webpack');
const path = require('path');

console.log("Building in", path.resolve());

function root(sub) {
  return path.join(path.resolve(), sub);
}

var webpackConfig = {
  target: 'TEMPLATED_target',
  entry: {
    'TEMPLATED_name': 'TEMPLATED_entry_point',
  },
  resolve: {
    alias: {
      __main__: 'TEMPLATED_root_dir',
      src: 'TEMPLATED_root_dir/src',
      'node_modules/@angular': '@angular',
    }
  },
  output: {
    filename: 'TEMPLATED_output'
  },
  module: {
    rules: [
      { test: /\.node$/, use: 'node-loader' }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, root('src')),
    new webpack.ContextReplacementPlugin(/(.+)?nestjs(\\|\/)core(.+)?/, root('src')),
    new webpack.ContextReplacementPlugin(/socket\.io(.+)?/, root('src')),
    new webpack.ContextReplacementPlugin(/bindings(.+)?/, root('src')),
    new webpack.ContextReplacementPlugin(/express(.+)?/, root('src')),
    new webpack.ContextReplacementPlugin(/hiredis(.+)?/, root('src')),
  ]
};

module.exports = webpackConfig;
