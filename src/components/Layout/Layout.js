import React from 'react';

const Layout = (props) => {
    const { children } = props;
    return (
        <div className="layout">
            <h2>Keep</h2>
            <div className="children">{children}</div>
        </div>
    );
};

export default Layout;
