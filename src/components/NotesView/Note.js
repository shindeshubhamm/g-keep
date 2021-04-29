import React from 'react';

import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { IoMdTrash } from 'react-icons/io';
import { RiInboxArchiveLine } from 'react-icons/ri';

const Note = (props) => {
    const { id, title, desc, pinned, archive, deleteNote, archiveNote } = props;
    const type = pinned ? 'pinned' : archive ? 'archive' : 'notes';

    const handleDelete = () => {
        deleteNote(id, type);
    };

    const handleArchive = () => {
        archiveNote(id);
    };

    return (
        <div className="note-card">
            <div className="top">
                <h2 className="title">{title}</h2>
                <button
                    type="button"
                    className={`cb pin-btn ${!pinned ? 'ho-vi' : ''}`}
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
                    onClick={handleArchive}
                >
                    <RiInboxArchiveLine className="arc-icon" />
                </button>
                <button
                    type="button"
                    className="cb arc-btn ho-vi"
                    onClick={handleDelete}
                >
                    <IoMdTrash className="arc-icon" />
                </button>
            </div>
        </div>
    );
};

export default Note;
