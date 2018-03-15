import { call, put, takeLatest } from 'redux-saga/effects';
import { PREPARE_SET_TRACK } from './constants';
import { setTrack } from './actions';
import axios from 'axios';
import * as Vibrant from 'node-vibrant';

export function* prepareSetTrack({ track }) {
    const palette = yield (new Vibrant(`/api/media/${track.id}/image`).getPalette());
    yield put(setTrack(track, palette.DarkVibrant
        ? `rgba(${palette.DarkVibrant._rgb.join()}, 0.7`
        : 'rgba(0,0,0,0.7'));
};

export default function* () {
    yield takeLatest(PREPARE_SET_TRACK, prepareSetTrack);
};
