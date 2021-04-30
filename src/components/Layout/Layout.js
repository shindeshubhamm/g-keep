import React, { useState } from 'react';

import ls from 'local-storage';
import { connect } from 'react-redux';

import { selectMenu, switchTheme } from '../../redux/actions/appActions';
import { clearSearch, searchNotes } from '../../redux/actions/notesActions';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = (props) => {
    const {
        children,
        app,
        selectMenu,
        searchNotes,
        switchTheme,
        clearSearch,
    } = props;
    const { selected, theme } = app;
    let sidebarState = ls.get('sidebar');
    if (window.innerWidth <= 800) {
        sidebarState = false;
    }
    const [sidebar, setSidebar] = useState(
        sidebarState !== null ? sidebarState : true,
    );
    const toggleSidebar = () => {
        setSidebar(!sidebar);
        ls.set('sidebar', !sidebar);
    };

    return (
        <div className="layout">
            <Navbar
                selected={selected}
                handleSidebar={toggleSidebar}
                searchNotes={searchNotes}
                clearSearch={clearSearch}
                switchTheme={switchTheme}
                theme={theme}
            />
            <div className="page">
                <Sidebar
                    selected={selected}
                    open={sidebar}
                    selectMenu={selectMenu}
                />
                <div className="children">{children}</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        app: state.app,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectMenu: (index) => dispatch(selectMenu(index)),
        searchNotes: (text) => dispatch(searchNotes(text)),
        clearSearch: () => dispatch(clearSearch()),
        switchTheme: () => dispatch(switchTheme()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
