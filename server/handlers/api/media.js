const sendFile = require('koa-send');
const router = new (require('koa-router'));
const library = require('../../services/library');
const path = require('path');
const config = require('config');
const fs = require('fs');

router.get('/media/:id',
  async (ctx) => {
    const item = (await library.get()).find(i => i.id === ctx.params.id);
    if (item) {
      await sendFile(ctx,
        path.basename(item.filePath), {
          root: config.libraryPath
        });
    } else {
      ctx.response.status = 404;
    }
  });

router.get('/media/:id/image',
  async (ctx) => {
    const item = (await library.get()).find(i => i.id === ctx.params.id);
    if (item && fs.existsSync(
      path.join(config.imagesPath, `${item.id}.jpg`)
    )) {
      await sendFile(ctx,
        `${item.id}.jpg`, {
          root: config.imagesPath
        });
    } else {
      await sendFile(ctx,
        `noimage.jpg`, {
          root: config.imagesPath
        });
    }
  });

module.exports = router.routes();
