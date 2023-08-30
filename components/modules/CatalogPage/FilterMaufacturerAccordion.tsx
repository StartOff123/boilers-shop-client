import React from 'react'
import { useMediaQuery } from '@/hooks'
import { CatalogTypes } from '@/types'
import { Accordion } from '@/components/elements'
import FilterCheckboxItem from './FilterCheckboxItem'

import styles from '@/styles/catalogStyle/index.module.scss'

const FilterMaufacturerAccordion:
    React.FC<CatalogTypes.IFilterManufacturerAccordionProps> = (
        { title, manufacturersList, setManufacturer, updateManufacturer }
    ) => {
        const isMobile = useMediaQuery(820)

        const chooseAllManufacturers = () =>
            setManufacturer(
                manufacturersList.map(item => ({ ...item, checked: true }))
            )

        return (
            <Accordion
                title={title}
                titleClass={styles.filters__manufacturer__btn}
                arrowOpenClass={styles.open}
                isMobileForFilters={isMobile}
                hideArrowClass={isMobile ? styles.hide_arrow : ''}
            >
                <div className={styles.filters__manufacturer__inner}>
                    <button className={styles.filters__manufacturer__select_all} onClick={chooseAllManufacturers}>Выбрать все</button>
                    <ul className={styles.filters__manufacturer__list}>
                        {manufacturersList.map(item =>
                            <FilterCheckboxItem
                                id={item.id}
                                key={item.id}
                                title={item.title}
                                checked={item.checked}
                                event={updateManufacturer}
                            />
                        )}
                    </ul>
                    <div style={{ height: 24 }} />
                </div>
            </Accordion>
        )
    }

export default FilterMaufacturerAccordion