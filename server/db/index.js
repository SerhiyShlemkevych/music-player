const { promisifyAll } = require('bluebird');
const fs = require('fs');
const path = require('path');

promisifyAll(fs);

const fileName = path.join(__dirname, 'storage.json');

const loadStorage = async () => {
    const serialized = await fs.readFileAsync(fileName);
    return JSON.parse(serialized);
};

const saveStorage = async (storage) => {
    const serialized = JSON.stringify(storage);

    await fs.writeFileAsync(fileName, serialized);
};

const put = async (key, data) => {
    const storage = await loadStorage();

    storage[key] = data;

    await saveStorage(storage);
};

const get = async (key) => {
    const storage = await loadStorage();

    return storage[key];
};

module.exports = {
    put,
    get
};
