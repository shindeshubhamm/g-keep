import React from 'react';

import { FiMenu } from 'react-icons/fi';

import Searchbar from './Searchbar';

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
    const { handleSidebar, selected, searchNotes, switchTheme, theme } = props;

    return (
        <div className="navbar">
            {/* <div className="navbar-logo"> */}
            <button onClick={handleSidebar} type="button" className="cb ham">
                <FiMenu className="ham-icon" />
            </button>
            <div className="title">
                {selected === 0 && <img src="/images/keep.png" alt="Keep" />}
                <h1 className="text">{getTitle(selected)}</h1>
            </div>
            {/* </div> */}
            <Searchbar searchNotes={searchNotes} />
            <div className="theme-switch-wrapper">
                <label className="theme-switch" htmlFor="checkbox">
                    <input
                        type="checkbox"
                        id="checkbox"
                        checked={theme === 'dark'}
                        onChange={switchTheme}
                    />
                    <div className="slider round" />
                </label>
            </div>
        </div>
    );
};

export default Navbar;
