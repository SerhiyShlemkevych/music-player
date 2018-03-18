import {
    ADD_TO_NOW_PLAYING,
    REMOVE_FROM_NOW_PLAYING,
    SET_NOW_PLAYING,
    PLAY_NOW_PLAYING,
    PAUSE_NOW_PLAYING,
    PREV_NOW_PLAYING,
    NEXT_NOW_PLAYING,
    PREPARE_TRACK_LIST,
    HIDE_NOW_PLAYING,
    SHOW_NOW_PLAYING,
    UPDATE_PROGRESS_BAR,
    UPDATE_TRACK_DURATION,
    LOAD_NOW_PLAYING,
    SAVE_NOW_PLAYING
} from './constants';

export const addToNowPlaying = (trackList) => ({
    type: PREPARE_TRACK_LIST,
    nextType: ADD_TO_NOW_PLAYING,
    trackList
});

export const removeFromNowPlaying = (trackList) => ({
    type: REMOVE_FROM_NOW_PLAYING,
    trackList
});

export const setNowPlaying = (trackList, track) => ({
    type: PREPARE_TRACK_LIST,
    nextType: SET_NOW_PLAYING,
    trackList,
    track
});

export const playNowPlaying = () => ({
    type: PLAY_NOW_PLAYING
});

export const pauseNowPlaying = () => ({
    type: PAUSE_NOW_PLAYING
});

export const nextNowPlaying = () => ({
    type: PLAY_NOW_PLYING
});

export const prevNowPlaying = () => ({
    type: PLAY_NOW_PLYING
});

export const showNowPlaying = () => ({
    type: SHOW_NOW_PLAYING
});


export const hideNowPlaying = () => ({
    type: HIDE_NOW_PLAYING
});

export const updateTrackDuration = (duration) => ({
    type: UPDATE_TRACK_DURATION,
    duration
});

export const updateProgressBar = (current, duration) => ({
    type: UPDATE_PROGRESS_BAR,
    payload: current / duration * 100
});

export const loadNowPlaying = () => ({
    type: LOAD_NOW_PLAYING
});

export const saveNowPaying = (trackList, track) => ({
    type: SAVE_NOW_PLAYING,
    trackList,
    track
});