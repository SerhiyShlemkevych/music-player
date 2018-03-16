import { SET_TRACK } from '../mini-player/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_TRACK:
            return {
                ...state,
                imageId: action.track.id
            };
        default:
            return state;
    }
};
