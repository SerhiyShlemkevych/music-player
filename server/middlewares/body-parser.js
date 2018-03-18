const bodyParser = require('koa-bodyparser');

module.exports = {
    apply(app) {
        app.use(bodyParser());
    }
};
