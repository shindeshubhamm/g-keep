import React, { Fragment } from 'react';

import ReactDOM from 'react-dom';

const Modal = (props) => {
    const { open, children, onClose } = props;

    return ReactDOM.createPortal(
        <Fragment>
            {open && (
                <Fragment>
                    {/* eslint-disable-next-line */}
                    <div className="modal" onClick={onClose} />
                    <div className="modal-content">{children}</div>
                </Fragment>
            )}
        </Fragment>,
        document.getElementById('modal'),
    );
};

Modal.defaultProps = {
    open: false,
    onClose: () => {},
    children: '',
};

export default Modal;
