import React, { Fragment, useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { addNote } from '../../redux/actions/notesActions';
import AddNote from '../AddNote/AddNote';
import NotesView from '../NotesView/NotesView';

const Notes = (props) => {
    const {
        ns: { notes, pinned },
        addNote,
    } = props;

    const [section, setSection] = useState(pinned?.length !== 0);

    useEffect(() => {
        setSection(pinned?.length !== 0);
    }, [pinned]);

    return (
        <div className="notes">
            <AddNote addNote={addNote} />
            {notes.length === 0 && pinned.length === 0 && (
                <p style={{ textAlign: 'center' }}>
                    Notes you add appear here!
                </p>
            )}
            {section && <p className="sub-title">PINNED</p>}
            {section && <NotesView cards={pinned} pinned />}
            {section && notes.length !== 0 && (
                <p className="sub-title">OTHERS</p>
            )}
            {notes.length !== 0 && <NotesView cards={notes} />}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProsp)(Notes);
