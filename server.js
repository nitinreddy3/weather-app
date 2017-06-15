var path = require('path');
var express = require('express');
var webpack = require('webpack');

var host = 'http://localhost';
var env = process.env.npm_config_NODE_ENV ? process.env.npm_config_NODE_ENV : 'dev';
var port = process.env.npm_config_PORT ? process.env.npm_config_PORT : 3333;

var config = require('./webpack.config.js');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  console.log(req.url);
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(port, 'localhost', function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
