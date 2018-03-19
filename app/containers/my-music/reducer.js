import {
    LOAD_LIBRARY_SUCCESS,
    SHOW_ADD_BUTTONS,
    HIDE_ADD_BUTTONS
} from './constants';

export default function (state = [], action) {
    switch (action.type) {
        case LOAD_LIBRARY_SUCCESS:
            return action.payload;
        case SHOW_ADD_BUTTONS: {
            return [
                ...state.slice(
                    0,
                    state.indexOf(action.item)
                ),
                {
                    ...action.item,
                    isHover: true
                },
                ...state.slice(
                    state.indexOf(action.item) + 1,
                    state.length
                ),
            ];
        };
        case HIDE_ADD_BUTTONS: {
            return [
                ...state.slice(
                    0,
                    state.indexOf(action.item)
                ),
                {
                    ...action.item,
                    isHover: false
                },
                ...state.slice(
                    state.indexOf(action.item) + 1,
                    state.length
                ),
            ];
        };
        default: return state;
    }
};
