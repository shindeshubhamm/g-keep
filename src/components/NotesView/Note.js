import React from 'react';

import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from 'react-icons/ri';

const Note = (props) => {
    const {
        id,
        title,
        desc,
        pinned,
        archive,
        deleteNote,
        archiveNote,
        unarchiveNote,
        pinNote,
        unPinNote,
    } = props;
    const type = pinned ? 'pinned' : archive ? 'archive' : 'notes';

    const handleDelete = () => {
        deleteNote(id, type);
    };

    const handleArcUnarc = () => {
        if (archive) {
            unarchiveNote(id);
            return;
        }
        archiveNote(id, type);
    };

    const handlePinUnpin = () => {
        if (pinned) {
            unPinNote(id);
            return;
        }
        pinNote(id);
    };

    return (
        <div className="note-card">
            <div className="top">
                <h2 className="title">{title}</h2>
                <button
                    type="button"
                    className={`cb pin-btn ${!pinned ? 'ho-vi' : ''}`}
                    title={`${pinned ? 'Unpin Note' : 'Pin Note'}`}
                    onClick={handlePinUnpin}
                >
                    {pinned ? (
                        <AiFillPushpin className="pin" />
                    ) : (
                        <AiOutlinePushpin className="pin" />
                    )}
                </button>
            </div>
            <p className="desc">{desc}</p>
            <div className="bottom">
                <button
                    type="button"
                    className="cb arc-btn ho-vi"
                    onClick={handleArcUnarc}
                    title={`${archive ? 'Unarchive Note' : 'Archive Note'}`}
                >
                    {!archive ? (
                        <RiInboxArchiveLine className="arc-icon" />
                    ) : (
                        <RiInboxUnarchiveLine className="arc-icon" />
                    )}
                </button>
                <button
                    type="button"
                    className="cb arc-btn ho-vi"
                    onClick={handleDelete}
                    title="Delete Note"
                >
                    <IoMdTrash className="arc-icon" />
                </button>
            </div>
        </div>
    );
};

export default Note;
