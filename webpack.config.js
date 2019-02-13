const fs = require('fs');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

var parentDir = path.join(__dirname, './');

var dist_folder = path.join(parentDir, 'dist');
var js_folder = path.join(parentDir, 'dist/js');
var ui_folder = path.join(parentDir, 'dist/static');

var delete_folders = [dist_folder, js_folder, ui_folder];

for (const folder of delete_folders) {
  var existing_folder = fs.existsSync(folder)
  if(!existing_folder) {
    var new_folder = fs.mkdirSync(folder);
    console.log("Create new => ",new_folder);
  }
  fs.readdirSync(folder, (err, files) => {
    if (err) throw console.log('ERROR Folder => ', folder);
    for (const file of files) {
      fs.unlink(path.join(folder, file), err => {
        if (err) throw console.log('ERROR File => ', file);
      });
    }
  });
}

var config = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "js/change_calculator.js",
    pathinfo: false //-6s
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
      oneOf: [
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpeg|gif)$/,
          loader: 'url-loader' ,
          options: {
            limit: 1000,
            name: 'static/[name].[hash:8].[ext]',
          },
        }
      ]
      }
    ]
  },
  optimization: { //-30s
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new ProgressBarPlugin(),
  ]
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    console.log("Development");
    config.mode='development';
    process.env.NODE_ENV = 'development';
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }));
  }

  if (argv.mode === 'production') {
    console.log("Production");
    config.mode='production';
    process.env.NODE_ENV = 'production';
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }));
  }

  return config;
};
