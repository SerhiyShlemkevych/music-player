const db = require('../../db');

const save = async ({ trackList, track }) => {
    db.put('now-playing', {
        track,
        trackList
    });
};

const get = async () => {
    return db.get('now-playing');
}

module.exports = {
    save,
    get
};
