import React from 'react';

import { FiMenu } from 'react-icons/fi';

const getTitle = (key) => {
    switch (key) {
        case 0:
            return 'Keep';
        case 1:
            return 'Archive';
        default:
            return 'Keep';
    }
};

const Navbar = (props) => {
    const { handleSidebar, selected } = props;

    return (
        <div className="navbar">
            <button onClick={handleSidebar} type="button" className="cb ham">
                <FiMenu className="ham-icon" />
            </button>
            <div className="title">
                {selected === 0 && <img src="/images/keep.png" alt="Keep" />}
                <h1 className="text">{getTitle(selected)}</h1>
            </div>
        </div>
    );
};

export default Navbar;