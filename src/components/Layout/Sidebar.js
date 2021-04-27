import React from 'react';

import { AiOutlineBulb } from 'react-icons/ai';
import { RiInboxArchiveLine } from 'react-icons/ri';

const menuData = [
    {
        Icon: AiOutlineBulb,
        name: 'Notes',
    },
    {
        Icon: RiInboxArchiveLine,
        name: 'Archive',
    },
];

const Sidebar = (props) => {
    const { open, selected } = props;

    return (
        <div className={`sidebar ${!open ? 'sidebar-close' : ''}`}>
            <div className="menuItems">
                {menuData.map((data, i) => (
                    <div
                        className={`m-item ${
                            selected === i ? 'm-selected' : ''
                        }`}
                        key={i}
                    >
                        <div className="icon-wrapper">
                            <data.Icon className="icon" />
                        </div>
                        <p className="text">{data.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
