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
    PIN_NOTE,
    SEARCH_NOTES,
    UNARCHIVE_NOTE,
    UNPIN_NOTE,
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

export const unarchiveNote = (id) => {
    const ids = ls.get('archive');
    const newIds = ids.filter((i) => i !== id);
    ls.set('archive', newIds);

    const notIds = ls.get('notes');
    const newNotIds = notIds && _.isArray(notIds) ? [...notIds, id] : [id];
    ls.set('notes', newNotIds);

    return {
        type: UNARCHIVE_NOTE,
        payload: { id },
    };
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
