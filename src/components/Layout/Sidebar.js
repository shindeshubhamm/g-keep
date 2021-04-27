import React from 'react';

import { AiOutlineBulb } from 'react-icons/ai';
import { RiInboxArchiveLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const menuData = [
    {
        Icon: AiOutlineBulb,
        name: 'Notes',
        link: '/',
    },
    {
        Icon: RiInboxArchiveLine,
        name: 'Archive',
        link: '/archive',
    },
];

const Sidebar = (props) => {
    const { open, selected, selectMenu } = props;

    return (
        <div className={`sidebar ${!open ? 'sidebar-close' : ''}`}>
            <div className="menuItems">
                {menuData.map((data, i) => (
                    <Link
                        to={data.link}
                        key={i}
                        style={{ textDecoration: 'none' }}
                        onClick={() => selectMenu(i)}
                    >
                        <div
                            className={`m-item ${
                                selected === i ? 'm-selected' : ''
                            }`}
                        >
                            <div className="icon-wrapper">
                                <data.Icon className="icon" />
                            </div>
                            <p className="text">{data.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
