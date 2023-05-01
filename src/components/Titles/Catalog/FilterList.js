import React from 'react'
import classes from './FilterList.module.css'

function FilterList({ list, activeFilter, onFilterSelect, filterClasses }) {
    return (
      <ul className={filterClasses}>
        {list.map((item) => (
          <li
            key={item}
            style={activeFilter === item ? {backgroundColor: 'rgba(0, 23, 68, 0.8)'} : {}}
            onClick={() => onFilterSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
}

export default FilterList