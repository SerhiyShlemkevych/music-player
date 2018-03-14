import {
    LOAD_LIBRARY_SUCCESS
} from './constants';

export default function (state = [], action) {
    switch (action.type) {
        case LOAD_LIBRARY_SUCCESS:
            return action.payload;
        default: return state;
    }
};
