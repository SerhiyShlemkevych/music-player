const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

module.exports = async (ctx) => {
    const content = await readFile(path.join(compiler.outputPath, 'index.html'));
    ctx.response.body = content.toString();
};
