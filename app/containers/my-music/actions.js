import {
    START_LOAD_LIBRARY,
    LOAD_LIBRARY_SUCCESS
} from './constants';

export const startLoadLibrary = () => ({
    type: START_LOAD_LIBRARY
});

export const loadLibrarySuccess = (library) => ({
    type: LOAD_LIBRARY_SUCCESS,
    payload: library
});