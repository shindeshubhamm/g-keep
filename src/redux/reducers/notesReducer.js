import ls from 'local-storage';

import {
    ADD_ARCHIVE_NOTE,
    ADD_NOTE,
    ADD_PINNED_NOTE,
    ARCHIVE_NOTE,
    BLANK_NOTE,
    DELETE_NOTE,
    LOAD_NOTES,
    SEARCH_NOTES,
    UNARCHIVE_NOTE,
} from '../types';

const initialState = {
    notes: [],
    archive: [],
    pinned: [],
};

let temp;

const layoutReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_NOTES:
            return {
                ...state,
                ...payload,
            };

        case ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, payload],
            };

        case ADD_ARCHIVE_NOTE:
            return {
                ...state,
                archive: [...state.archive, payload],
            };

        case ADD_PINNED_NOTE:
            return {
                ...state,
                pinned: [...state.pinned, payload],
            };

        case BLANK_NOTE:
            return { ...state };

        case DELETE_NOTE:
            if (['notes', 'archive', 'pinned'].includes(payload.type)) {
                return {
                    ...state,
                    [payload.type]: state[payload.type].filter(
                        (note) => note.id !== payload.id,
                    ),
                };
            }
            return { ...state };

        case ARCHIVE_NOTE:
            return {
                ...state,
                archive: [...state.archive, ls.get(payload.id)],
                [payload.type]: state[payload.type].filter(
                    (note) => note.id !== payload.id,
                ),
            };

        // case UNARCHIVE_NOTE:
        //     return {
        //         ...state,
        //         archive: state.archive.f
        //     };

        default:
            return { ...state };
    }
};

export default layoutReducer;
