import React from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import {
    archiveNote,
    deleteNote,
    unarchiveNote,
} from '../../redux/actions/notesActions';
import Note from './Note';

const NotesView = (props) => {
    const {
        cards,
        deleteNote,
        archiveNote,
        pinned,
        archive,
        unarchiveNote,
    } = props;

    return (
        <div className="notes-view-wrapper">
            {cards &&
                _.isArray(cards) &&
                cards.map((c) => (
                    <Note
                        {...c}
                        key={c.id}
                        pinned={pinned}
                        archive={archive}
                        deleteNote={deleteNote}
                        archiveNote={archiveNote}
                        unarchiveNote={unarchiveNote}
                    />
                ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (id, type) => dispatch(deleteNote(id, type)),
        archiveNote: (id, type) => dispatch(archiveNote(id, type)),
        unarchiveNote: (id) => dispatch(unarchiveNote(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesView);
