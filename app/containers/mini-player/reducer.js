import {
  SET_TRACK,
  RESUME,
  PAUSE,
  UPDATE_PROGRESS_BAR,
  UPDATE_TRACK_LENGTH
} from './constants';

export default function (state = {
  progress: 0,
  track: {},
  duration: 0
}, action) {
  switch (action.type) {
    case UPDATE_TRACK_LENGTH:
      return {
        ...state,
        duration: action.duration   
      };
    case SET_TRACK:
      return {
        ...state,
        track: action.track,
        duration: 0,
        progress: 0,
        color: action.color
      };
    case PAUSE:
      return {
        ...state,
        shouldPlay: false
      };
    case RESUME:
      return {
        ...state,
        shouldPlay: true
      };
    case UPDATE_PROGRESS_BAR:
      return {
        ...state,
        progress: action.payload
      }
    default: return state;
  }
};
