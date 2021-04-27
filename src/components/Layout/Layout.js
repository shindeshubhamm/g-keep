import React, { useState } from 'react';

import ls from 'local-storage';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = (props) => {
    const { children, app } = props;
    const { selected } = app;
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
            <Navbar selected={selected} handleSidebar={toggleSidebar} />
            <div className="page">
                <Sidebar selected={selected} open={sidebar} />
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
