import React from 'react'
import classes from './FilterList.module.css'

function FilterList({ list, activeFilter, onFilterSelect, filterClasses }) {
    return (
      <ul className={filterClasses}>
        {list.map((item) => (
          <li
            key={item}
            className={activeFilter === item ? classes.active : ''}
            onClick={() => onFilterSelect(item)}
          >
            {item}
            {console.log(`activeFilter: ${activeFilter}, item: ${item}`)}
          </li>
        ))}
      </ul>
    );
}

export default FilterList