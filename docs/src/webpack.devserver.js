const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config')();

const port = process.env.PORT || 5000;

webpackConfig.output.publicPath = `http://localhost:${port}/`;

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  inline: true,
  hot: true,
});

server.listen(port, 'localhost', () => {
  console.info(`Webpack dev server started at http://localhost:${port}`);
});
