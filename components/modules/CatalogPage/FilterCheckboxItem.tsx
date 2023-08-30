import { CatalogTypes } from '@/types'
import React from 'react'

import styles from '@/styles/catalogStyle/index.module.scss'

const FilterCheckboxItem: React.FC<CatalogTypes.IFilterCheckboxItem> = ({ title, checked, id, event }) => {
    const handleFilterChange = () => event({ checked: !checked, id } as CatalogTypes.IFilterCheckboxItem)

    return (
        <li className={styles.filters__manufacturer__list__item}>
            <label>
                <input type="checkbox" checked={checked} onChange={handleFilterChange}/>
                <span>{title}</span>
            </label>
        </li>
    )
}

export default FilterCheckboxItem