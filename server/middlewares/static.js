const send = require('koa-send');
const path = require('path');

module.exports = {
    apply(app) {
        app.use(async (ctx, next) => {
            if (ctx.path.startsWith('/static')) {
                await send(ctx,
                    ctx.path,
                    {
                        root: path.join(__dirname, '../../app/')
                    });
            } else {
                return next();
            }
        })
    }
}