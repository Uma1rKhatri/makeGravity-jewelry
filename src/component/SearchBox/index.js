import React from 'react'
import { Input } from "antd";

const Search = Input.Search;

const SearchBox = (props) => {

    const handleSearch = (e) => {
        let { value } = e.target;
        props.search(value);
    };

    return (
        <Search placeholder="Search..." placeholder={props.placeholder} onChange={handleSearch} enterButton />
    )
}

export default SearchBox