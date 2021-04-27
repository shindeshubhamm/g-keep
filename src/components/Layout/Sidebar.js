import React, { useEffect, useState } from 'react';

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
    const [localState, setLocalState] = useState(open);

    useEffect(() => {
        setLocalState(open);
    }, [open]);

    const handleMouseEnter = () => {
        setLocalState(true);
    };
    const handleMouseLeave = () => {
        if (!open) {
            setLocalState(false);
        }
    };

    return (
        <div
            className={`sidebar ${!localState ? 'sidebar-close' : ''} ${
                localState && !open ? 'sidebar-fixed' : ''
            } `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
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
