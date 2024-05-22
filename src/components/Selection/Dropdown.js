import React, { useState } from 'react';
import Styles from './Dropdown.module.css';

function Dropdown({ options, value, onChange }) {
    const handleChange = event => {
        onChange(event.target.value);
    };

    return (
        <select value={value} onChange={handleChange} className={Styles.Select}>
            {options.map(option => (
                <option key={option.title} value={option.title}>
                    {option.label ? option.label : option.title}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
