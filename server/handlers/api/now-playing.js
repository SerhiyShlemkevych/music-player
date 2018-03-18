const service = require('../../services/now-playing');
const router = new (require('koa-router'));

router.get('/now-playing',
    async (ctx) => {
        ctx.response.body = await service.get();
    });

router.put('/now-playing',
    async (ctx) => {
        const { track, trackList } = ctx.request.body;
        await service.save({ track, trackList });
        ctx.response.status = 200;
    });

module.exports = router.routes();
