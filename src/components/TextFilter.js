import React, { useState } from 'react';

export default function TextFilter(props) {

    const [filter, setFilter] = useState('');
    const filterKey = props.name.toLowerCase();

    function handleFilter(e) {
        setFilter(e.target.value);
        props.setRequestOptions({
            ...props.requestOptions,
            params: { ...props.requestOptions.params, search: { ...props.requestOptions.params.search, [filterKey]: e.target.value} }
        });
    }

    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.name}</label>
            <input className="form-control form-control-sm" aria-describedby={props.name + "-sm"} type="text" name={props.name} value={filter} onChange={handleFilter} />
        </div>
    );
}