import React, { useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import { CgMathPlus } from 'react-icons/cg';

const Searchbar = (props) => {
    const { searchNotes } = props;
    const [search, setSearch] = useState('');

    const handleSearch = (data) => {
        setSearch(data);
        searchNotes(props);
    };

    return (
        <div className="search-wrapper">
            <input
                type="text"
                name="searchText"
                value={search}
                className="search-field"
                placeholder="Search"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <AiOutlineSearch className="icon search-icon" />
            {search && (
                <button
                    className="icon cross-button"
                    type="button"
                    onClick={() => handleSearch('')}
                >
                    <CgMathPlus className="cross-icon" />
                </button>
            )}
        </div>
    );
};

export default Searchbar;
