import ls from 'local-storage';
import _ from 'lodash';

import {
    ADD_ARCHIVE_NOTE,
    ADD_NOTE,
    ADD_PINNED_NOTE,
    ARCHIVE_NOTE,
    BLANK_NOTE,
    CLEAR_SEARCH,
    DELETE_NOTE,
    LOAD_NOTES,
    PIN_NOTE,
    SEARCH_NOTES,
    UNARCHIVE_NOTE,
    UNPIN_NOTE,
} from '../types';
import { setAlert } from './appActions';

export const searchNotes = (text) => {
    if (!text.trim()) {
        return {
            type: CLEAR_SEARCH,
        };
    }
    ls.set('search', text);
    return {
        type: SEARCH_NOTES,
        payload: { text },
    };
};

export const clearSearch = () => {
    ls.remove('search');
    return {
        type: CLEAR_SEARCH,
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
    const archive = fetchNotes(ls.get('archive'));
    const pinned = fetchNotes(ls.get('pinned'));

    dispatch({
        type: LOAD_NOTES,
        payload: { notes, archive, pinned },
    });
    dispatch(searchNotes(ls.get('search') || ''));
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
export const deleteNote = (id, type) => (dispatch) => {
    ls.remove(id);
    const ids = ls.get(type);
    const newIds = ids.filter((i) => i !== id);
    ls.set(type, newIds);

    dispatch({
        type: DELETE_NOTE,
        payload: { id, type },
    });
    dispatch(setAlert('Note Deleted'));
};

// ARCHIVE NOTE
export const archiveNote = (id, type) => (dispatch) => {
    const ids = ls.get(type);
    const newIds = ids.filter((i) => i !== id);
    const arcIds = ls.get('archive');
    ls.set(type, newIds);

    const newArcIds = arcIds && _.isArray(arcIds) ? [...arcIds, id] : [id];
    ls.set('archive', newArcIds);

    dispatch({
        type: ARCHIVE_NOTE,
        payload: { id, type },
    });
    dispatch(setAlert('Note Archived'));
};

export const unarchiveNote = (id) => (dispatch) => {
    const ids = ls.get('archive');
    const newIds = ids.filter((i) => i !== id);
    ls.set('archive', newIds);

    const notIds = ls.get('notes');
    const newNotIds = notIds && _.isArray(notIds) ? [...notIds, id] : [id];
    ls.set('notes', newNotIds);

    dispatch({
        type: UNARCHIVE_NOTE,
        payload: { id },
    });
    dispatch(setAlert('Note Unarchived'));
};

// PIN NOTE
export const pinNote = (id, type) => {
    const ids = ls.get(type);
    const newIds = ids.filter((i) => i !== id);
    const pinIds = ls.get('pinned');
    ls.set(type, newIds);

    const newPinIds = pinIds && _.isArray(pinIds) ? [...pinIds, id] : [id];
    ls.set('pinned', newPinIds);

    return {
        type: PIN_NOTE,
        payload: { id, type },
    };
};

export const unpinNote = (id, type) => {
    const ids = ls.get('pinned');
    const newIds = ids.filter((i) => i !== id);
    ls.set('pinned', newIds);

    const notIds = ls.get('notes');
    const newNotIds = notIds && _.isArray(notIds) ? [...notIds, id] : [id];
    ls.set('notes', newNotIds);

    return {
        type: UNPIN_NOTE,
        payload: { id },
    };
};
