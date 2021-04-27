import { NOTES_ADD, NOTES_ARCHIVE, NOTES_PIN, NOTES_SEARCH } from '../types';

const initialState = {
    notes: [],
    archived: [],
    pinned: [],
};

const layoutReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case NOTES_SEARCH:
            return {
                ...state,
                notes: [],
            };
        default:
            return {
                ...state,
            };
    }
};

export default layoutReducer;
