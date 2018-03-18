import { call, put, takeLatest } from 'redux-saga/effects';
import {
    PREPARE_TRACK_LIST,
    LOAD_NOW_PLAYING,
    SAVE_NOW_PLAYING
} from './constants';
import { setNowPlaying } from './actions';
import axios from 'axios';
import * as Vibrant from 'node-vibrant';

export function* prepareTrackList({ trackList, nextType }) {
    trackList = yield Promise.all(trackList.map((track) => {
        return track.color
            ? Promise.resolve(track)
            : new Vibrant(`/api/media/${track.id}/image`)
                .getPalette()
                .then((palette) => {
                    track.color = palette.DarkVibrant
                        ? `rgba(${palette.DarkVibrant._rgb.join()}, 0.7`
                        : 'rgba(0,0,0,0.7';
                    return track;
                });
    }));
    yield put({
        type: nextType,
        trackList
    });
};

export function* saveNowPaying({ trackList, track }) {
    yield call(() => axios.put('/api/now-playing', { track, trackList }));
};

export function* loadNowPlaying() {
    const { data: { track, trackList } } = yield call(() =>
        axios.get('/api/now-playing'));
    yield put(setNowPlaying(trackList || [], track));
}

export default function* () {
    yield takeLatest(PREPARE_TRACK_LIST, prepareTrackList);
    yield takeLatest(SAVE_NOW_PLAYING, saveNowPaying);
    yield takeLatest(LOAD_NOW_PLAYING, loadNowPlaying);
};
