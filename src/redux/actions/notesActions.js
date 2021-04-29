import ls from 'local-storage';
import _ from 'lodash';

import {
    ADD_ARCHIVE_NOTE,
    ADD_NOTE,
    ADD_PINNED_NOTE,
    ARCHIVE_NOTE,
    BLANK_NOTE,
    DELETE_NOTE,
    LOAD_NOTES,
    SEARCH_NOTES,
} from '../types';

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

export const loadNotes = () => {
    const notes = fetchNotes(ls.get('notes'));
    const archive = fetchNotes(ls.get('archive'));
    const pinned = fetchNotes(ls.get('pinned'));

    return {
        type: LOAD_NOTES,
        payload: { notes, archive, pinned },
    };
};

const modifyNotesDB = (id, type) => {
    const ids = ls.get(type);
    const newIds = ids && _.isArray(ids) ? [...ids, id] : [id];
    ls.set(type, newIds);
};

export const addNote = (note, pin, archive) => (dispatch) => {
    if (!note.title && !note.desc) {
        dispatch({ type: BLANK_NOTE });
        return;
    }
    const id = Date.now();
    ls.set(id, note);
    if (archive) {
        modifyNotesDB(id, 'archive');
        dispatch({ type: ADD_ARCHIVE_NOTE, payload: { id, ...note } });
    } else if (pin) {
        modifyNotesDB(id, 'pinned');
        dispatch({ type: ADD_PINNED_NOTE, payload: { id, ...note } });
    } else {
        modifyNotesDB(id, 'notes');
        dispatch({ type: ADD_NOTE, payload: { id, ...note } });
    }
};

// DELETE NOTE
export const deleteNote = (id, type) => {
    ls.remove(id);
    const ids = ls.get(type);
    const newIds = ids.filter((i) => i !== id);
    ls.set(type, newIds);

    return {
        type: DELETE_NOTE,
        payload: { id, type },
    };
};

// ARCHIVE NOTE
export const archiveNote = (id, type) => {
    const ids = ls.get(type);
    const newIds = ids.filter((i) => i !== id);
    const arcIds = ls.get('archive');
    ls.set(type, newIds);

    const newArcIds = arcIds && _.isArray(arcIds) ? [...arcIds, id] : [id];
    ls.set('archive', newArcIds);

    return {
        type: ARCHIVE_NOTE,
        payload: { id, type },
    };
};
