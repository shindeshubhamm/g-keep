import React, { Fragment } from 'react';

import Note from './Note';

const NotesView = (props) => {
    const { notes } = props;

    return (
        <div>
            {notes && notes.length !== 0 ? (
                <Fragment>
                    {notes.map((note) => (
                        <Note {...note} key={note.id} />
                    ))}
                </Fragment>
            ) : (
                <p>Currently no notes available!</p>
            )}
        </div>
    );
};

export default NotesView;
