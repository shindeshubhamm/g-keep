import React from 'react';

import { connect } from 'react-redux';

import NotesView from '../NotesView/NotesView';

const Notes = (props) => {
    const {
        ns: { notes, pinned },
    } = props;

    return (
        <div>
            <NotesView notes={notes} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ns: state.notes,
    };
};

export default connect(mapStateToProps)(Notes);
