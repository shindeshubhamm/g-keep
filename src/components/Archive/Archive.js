import React from 'react';

import { connect } from 'react-redux';

import NotesView from '../NotesView/NotesView';

const Archive = (props) => {
    const {
        ns: { archive },
    } = props;

    return (
        <div className="archive-notes">
            {archive.length !== 0 ? (
                <NotesView cards={archive} archive />
            ) : (
                <p style={{ textAlign: 'center' }}>Archive appear here!</p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ns: state.notes,
    };
};

export default connect(mapStateToProps)(Archive);
