import {
    ADD_TO_NOW_PLAYING,
    REMOVE_FROM_NOW_PLAYING,
    SET_NOW_PLAYING,
    PLAY_NOW_PLAYING,
    PAUSE_NOW_PLAYING,
    PREV_NOW_PLAYING,
    NEXT_NOW_PLAYING,
    SHOW_NOW_PLAYING,
    HIDE_NOW_PLAYING,
    UPDATE_TRACK_DURATION,
    UPDATE_PROGRESS_BAR
} from './constants';

import { remove, includes } from 'lodash';

const defaultState = {
    trackList: [],
    track: {},
    isNowPlaying: false,
    duration: '0:00',
    progress: 0,
    progressText: '0:00',
    isVisible: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_PROGRESS_BAR:
        return {
          ...state,
          progress: action.payload
        }
        case UPDATE_TRACK_DURATION:
            return {
                ...state,
                duration: action.duration
            };
        case SHOW_NOW_PLAYING:
            return {
                ...state,
                isVisible: true
            };
        case HIDE_NOW_PLAYING:
            return {
                ...state,
                isVisible: false
            };
        case ADD_TO_NOW_PLAYING: {
            if (state.trackList.length) {
                return {
                    ...state,
                    trackList: [
                        ...state.trackList,
                        ...action.trackList
                    ]
                };
            } else {
                return {
                    ...state,
                    trackList: action.trackList,
                    track: action.trackList[0] || {}
                };
            }
        };
        case REMOVE_FROM_NOW_PLAYING: {
            const newTrackList = remove(state.trackList.slice(),
                (track) => includes(action.trackList, track));
            return {
                ...state,
                trackList: newTrackList,
                track: includes(newTrackList, state.track)
                    ? state.track
                    : newTrackList[0] || {}
            };
        };
        case SET_NOW_PLAYING: {
            return {
                ...state,
                trackList: action.trackList,
                track: action.track || action.trackList[0] || {},
                isNowPlaying: action.autoplay
            };
        };
        case PLAY_NOW_PLAYING:
            return {
                ...state,
                isNowPlaying: state.track.id
                    ? true
                    : false
            };
        case PAUSE_NOW_PLAYING: {
            return {
                ...state,
                isNowPlaying: false
            };
        };
        case PREV_NOW_PLAYING: {
            const index = state.trackList.indexOf(state.track);
            return index > 0
                ? {
                    ...state,
                    track: state.trackList[index - 1]
                }
                : state;
        };
        case NEXT_NOW_PLAYING: {
            const index = state.trackList.indexOf(state.track);
            return index < state.trackList.length - 1
                ? {
                    ...state,
                    track: state.trackList[index + 1]
                }
                : state;
        };
        default:
            return state;
    };
};
