const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../../internals/webpack/webpack.dev.babel');

module.exports = {
    apply(app) {
        const compiler = webpack(webpackConfig);

        app.context.webpack = compiler;

        const middleware = devMiddleware(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath,
            silent: true,
            stats: 'errors-only',
        });

        app.use(middleware);

        app.use(hotMiddleware(compiler));

        const fs = middleware.fileSystem;

        module.exports.handler = async (ctx, next) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
                    if (err) {
                        resolve(next());
                    } else {
                        ctx.response.body = file.toString();
                        resolve(next());
                    }
                });
            });
        };
    }
};
