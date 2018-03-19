import {
    START_LOAD_LIBRARY,
    LOAD_LIBRARY_SUCCESS,
    SHOW_ADD_BUTTONS,
    HIDE_ADD_BUTTONS
} from './constants';

export const startLoadLibrary = () => ({
    type: START_LOAD_LIBRARY
});

export const loadLibrarySuccess = (library) => ({
    type: LOAD_LIBRARY_SUCCESS,
    payload: library
});

export const showAddButtons = (item) => ({
    type: SHOW_ADD_BUTTONS,
    item
});

export const hideAddButtons = (item) => ({
    type: HIDE_ADD_BUTTONS,
    item
});
