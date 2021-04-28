import ls from 'local-storage';
import _ from 'lodash';

import { ADD_NOTE, LOAD_NOTES, SEARCH_NOTES } from '../types';

export const searchNotes = (data) => {
    return {
        type: SEARCH_NOTES,
        payload: data,
    };
};

const fetchNotes = (ids) => {
    const notes = [];
    let note;
    if (ids && _.isArray(ids)) {
        ids.forEach((id) => {
            note = ls.get(id);
            if (note && _.isObject(note)) {
                notes.push({ id, ...note });
            }
        });
    }
    return notes;
};

export const loadNotes = () => (dispatch) => {
    const notes = fetchNotes(ls.get('notes'));
    const archived = fetchNotes(ls.get('archive'));
    const pinned = fetchNotes(ls.get('pinned'));

    dispatch({
        type: LOAD_NOTES,
        payload: { notes, archived, pinned },
    });
};

export const addNote = (data) => {
    const note = {
        ...data,
        id: Date.now(),
    };
    const notes = ls.get('notes');
    const newNotes = notes ? [...notes, note] : [note];

    return {
        type: ADD_NOTE,
        payload: newNotes,
    };
};
