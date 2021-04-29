import React, { useEffect, useRef, useState } from 'react';

import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { RiInboxArchiveLine } from 'react-icons/ri';

const AddNote = (props) => {
    const { addNote } = props;
    const [full, _setFull] = useState(false);
    const [data, _setData] = useState({ title: '', desc: '' });
    const [pin, _setPin] = useState(false);
    const node = useRef();
    const fullRef = useRef(full);
    const dataRef = useRef(data);
    const pinRef = useRef(pin);

    const setFull = (val) => {
        _setFull(val);
        fullRef.current = val;
    };
    const setData = (val) => {
        _setData(val);
        dataRef.current = val;
    };
    const setPin = (val) => {
        _setPin(val);
        pinRef.current = val;
    };

    const handleValues = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (data, archive) => {
        if (data.title?.trim() || data.desc?.trim()) {
            addNote(data, pinRef.current, archive);
        }
        setData({ title: '', desc: '' });
        setPin(false);
        setFull(false);
    };

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            return;
        }
        if (fullRef.current) {
            handleSubmit(dataRef.current, pinRef.current);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <div className="add-note" ref={node}>
            {full && (
                <button
                    type="button"
                    className="pin-button"
                    onClick={() => setPin(!pin)}
                    title="Pin Note"
                >
                    {pin && <AiFillPushpin className="pin" />}
                    {!pin && <AiOutlinePushpin className="pin" />}
                </button>
            )}
            {full && (
                <input
                    type="text"
                    name="title"
                    value={data.title}
                    className="ip title"
                    placeholder="Title"
                    onChange={handleValues}
                />
            )}
            <input
                type="text"
                name="desc"
                value={data.desc}
                className={`ip des ${full ? 'full' : ''}`}
                placeholder="Take a note..."
                onFocus={() => setFull(true)}
                onChange={handleValues}
            />
            {full && (
                <div className="an-panel">
                    <button
                        type="button"
                        onClick={() => handleSubmit(data, true)}
                        className="an-btn arc-btn"
                        title="Archive Note"
                    >
                        <RiInboxArchiveLine className="arc-icon" />
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSubmit(data)}
                        className="an-btn cls-btn"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddNote;
