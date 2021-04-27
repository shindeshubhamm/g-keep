import { NOTES_SEARCH } from '../types';

export const searchNotes = (data) => {
    return {
        type: NOTES_SEARCH,
        payload: data,
    };
};
