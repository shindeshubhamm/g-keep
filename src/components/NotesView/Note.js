import React from 'react';

const Note = (props) => {
    const { id, title, desc } = props;

    return (
        <div style={{ margin: '20px' }}>
            <h3 style={{ margin: 0 }}>{title}</h3>
            <p style={{ margin: 0 }}>{desc}</p>
        </div>
    );
};

export default Note;
