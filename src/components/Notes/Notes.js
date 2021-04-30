import React, { Fragment, useEffect, useState } from 'react';

import ls from 'local-storage';
import { connect } from 'react-redux';

import { addNote } from '../../redux/actions/notesActions';
import AddNote from '../AddNote/AddNote';
import NotesView from '../NotesView/NotesView';

const Notes = (props) => {
    const {
        ns: { notes, pinned, searchN, searchA, searchP },
        addNote,
    } = props;

    const [section, setSection] = useState(pinned?.length !== 0);

    useEffect(() => {
        setSection(pinned?.length !== 0);
    }, [pinned]);

    return (
        <div className="notes">
            {!ls.get('search') ? (
                <Fragment>
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
                </Fragment>
            ) : (
                <div className="searchrs">
                    <h1>Search Results</h1>
                    {searchN.length === 0 &&
                        searchA.length === 0 &&
                        searchP.length === 0 && (
                            <p style={{ textAlign: 'center' }}>
                                No notes found!
                            </p>
                        )}
                    {searchP.length !== 0 && (
                        <div className="result">
                            <p className="sub-title">PINNED</p>
                            <NotesView cards={searchP} pinned />
                        </div>
                    )}
                    {searchN.length !== 0 && (
                        <div className="result">
                            <p className="sub-title">NOTES</p>
                            <NotesView cards={searchN} />
                        </div>
                    )}
                    {searchA.length !== 0 && (
                        <div className="result">
                            <p className="sub-title">ARCHIVED</p>
                            <NotesView cards={searchA} archive />
                        </div>
                    )}
                </div>
            )}
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
