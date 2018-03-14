const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../../internals/webpack/webpack.dev.babel');

module.exports = {
    apply(app) {
        const compiler = webpack(webpackConfig);

        app.use(devMiddleware(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath,
            silent: true,
            stats: 'errors-only',
        }));

        app.use(hotMiddleware(compiler));
    }
};
