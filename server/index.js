const Koa = require('koa');
const middlewares = require('./middlewares');
const api = require('./handlers/api');
const webpack = require('./middlewares/webpack')

const app = new Koa();

middlewares.forEach(m => m.apply(app));

app.use(api);
app.use(webpack.handler);

app.listen(3333);