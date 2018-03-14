import { call, put, takeLatest } from 'redux-saga/effects';
import { START_LOAD_LIBRARY } from './constants';
import { loadLibrarySuccess } from './actions';
import axios from 'axios';

export function* startLoadLibrary() {
    const { data: library } = yield call(() => axios.get('/api/library'));
    yield put(loadLibrarySuccess(library));
};

export default function* () {
    yield takeLatest(START_LOAD_LIBRARY, startLoadLibrary);
};
