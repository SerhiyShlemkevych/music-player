const Koa = require('koa');
const middlewares = require('./middlewares');
const frontend = require('./handlers/frontend');
const api = require('./handlers/api');

const app = new Koa();

middlewares.forEach(m => m.apply(app));

app.use(api);
app.use(frontend);

app.listen(3333);