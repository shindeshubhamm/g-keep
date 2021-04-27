import React, { useState } from 'react';

import ls from 'local-storage';
import { connect } from 'react-redux';

import { selectMenu, switchTheme } from '../../redux/actions/appActions';
import { searchNotes } from '../../redux/actions/notesActions';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = (props) => {
    const { children, app, selectMenu, searchNotes, switchTheme } = props;
    const { selected, theme } = app;
    const sidebarState = ls.get('sidebar');
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
        switchTheme: () => dispatch(switchTheme()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
