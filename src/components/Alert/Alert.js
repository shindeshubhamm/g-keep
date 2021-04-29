import React, { Fragment } from 'react';

const Alert = (props) => {
    const { open, message } = props;

    return (
        <Fragment>
            {open && message && (
                <div className="alert">
                    <span className="al-message">{message}</span>
                </div>
            )}
        </Fragment>
    );
};

export default Alert;
