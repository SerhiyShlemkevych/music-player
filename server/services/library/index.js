const fs = require('fs');
const globby = require('globby');
const {
  promisifyAll,
  promisify,
  map: promiseMap
} = require('bluebird');
const config = require('config');
const path = require('path');
const db = require('../../db');
const uuid = require('uuid').v4;

let getMetadata = require('musicmetadata');
getMetadata = promisify(getMetadata);


const scan = async () => {
  const pattern = path.join(config.libraryPath, '/**/*.*');
  const paths = (await globby.sync(pattern)).slice(0, 100);

  const library = await promiseMap(paths, async (filePath) => {
    let stream;
    const id = uuid();
    try {
      stream = fs.createReadStream(filePath);

      stream.on('error', () => {})
      const {
        picture,
        ...metadata
      } = await getMetadata(stream);

      if (picture[0]) {
        const imagePath = path.join(
          config.imagesPath,
          `${id}.jpg`
        );

        await fs.writeFileAsync(imagePath, picture[0].data);
      }

      return {
        ...metadata,
        filePath,
        id
      }
    } catch (err) {
      return {
        filePath,
        id
      };
    } finally {
      stream && stream.close();
    }
  });

  await db.put('library', library);
};

const get = async () => {
  return db.get('library');
};

module.exports = {
  scan,
  get
};
