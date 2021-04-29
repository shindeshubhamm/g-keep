import React from 'react';

import { connect } from 'react-redux';

import { addNote, deleteNote } from '../../redux/actions/notesActions';
import AddNote from '../AddNote/AddNote';
import NotesView from '../NotesView/NotesView';

const Notes = (props) => {
    const {
        ns: { notes, pinned },
        addNote,
        deleteNote,
    } = props;

    return (
        <div className="notes">
            <AddNote addNote={addNote} />
            <NotesView notes={notes} pinned={pinned} deleteNote={deleteNote} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ns: state.notes,
    };
};

const mapDispatchToProsp = (dispatch) => {
    return {
        addNote: (data, pin, archive) => dispatch(addNote(data, pin, archive)),
        deleteNote: (id, type) => dispatch(deleteNote(id, type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProsp)(Notes);
