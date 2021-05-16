import React from 'react';

import ls from 'local-storage';
import { FiMenu } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

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
    const {
        handleSidebar,
        selected,
        searchNotes,
        switchTheme,
        theme,
        clearSearch,
    } = props;

    const userData = ls.get('user');

    const history = useHistory();

    const handleLogout = () => {
        ls.remove('user');
        history.push('/login');
    };

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
            <Searchbar searchNotes={searchNotes} clearSearch={clearSearch} />
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
            <div>
                <button
                    type="button"
                    title="Logout"
                    style={{ display: 'contents' }}
                    onClick={handleLogout}
                >
                    <img
                        src={userData.imageUrl}
                        alt=""
                        className="loggedin-user"
                    />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
