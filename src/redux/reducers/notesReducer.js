import { ADD_NOTE, LOAD_NOTES, SEARCH_NOTES } from '../types';

const initialState = {
    notes: [],
    archived: [],
    pinned: [],
};

const layoutReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_NOTES:
            return {
                ...state,
                ...payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export default layoutReducer;
