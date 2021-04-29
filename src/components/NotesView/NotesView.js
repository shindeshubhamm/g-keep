import React, { Fragment, useEffect, useState } from 'react';

import Note from './Note';

const NotesView = (props) => {
    const { notes, pinned, deleteNote } = props;
    const [section, setSection] = useState(!!(pinned?.length !== 0));

    useEffect(() => {
        setSection(!!(pinned?.length !== 0));
    }, [notes, pinned]);

    return (
        <div className="notes-view-wrapper">
            {notes.length === 0 && pinned.length === 0 && (
                <p style={{ textAlign: 'center' }}>
                    Notes you add appear here!
                </p>
            )}

            {section && <p className="sub-title">PINNED</p>}
            <div className="notes-view">
                {pinned && pinned.length !== 0 && (
                    <Fragment>
                        {pinned.map((note) => (
                            <Note
                                {...note}
                                key={note.id}
                                pinned
                                deleteNote={deleteNote}
                            />
                        ))}
                    </Fragment>
                )}
            </div>
            {section && notes.length !== 0 && (
                <p className="sub-title">OTHERS</p>
            )}
            <div className="notes-view">
                {notes && notes.length !== 0 && (
                    <Fragment>
                        {notes.map((note) => (
                            <Note
                                {...note}
                                key={note.id}
                                deleteNote={deleteNote}
                            />
                        ))}
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default NotesView;
