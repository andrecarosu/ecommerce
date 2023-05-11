import React from 'react';
import s from './BoxFilters.module.css'

const BoxFilters = ({ activeFilter }) => {
    return (
        <div className={s.box}>
            {
                Object.keys(activeFilter).map((key, index) => {
                    return (
                        <label key={index}>
                            <span className={s.key}>{key.toUpperCase()}: </span>
                            <span className={s.name}>{`${activeFilter[key].toString().toUpperCase()} > `}{"  "}</span>
                        </label>
                    )
                })
            }
        </div>
    );
}

export default BoxFilters;
