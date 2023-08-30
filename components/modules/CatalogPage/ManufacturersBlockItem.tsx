import React from 'react'
import { motion } from 'framer-motion'
import { CatalogTypes } from '@/types'

import styles from '@/styles/catalogStyle/index.module.scss'

const ManufacturersBlockItem: React.FC<CatalogTypes.IManufacturersBlockItemProps> = ({ item, event }) => {
    const removeFilter = () => event({ checked: !item.checked, id: item.id } as CatalogTypes.IFilterCheckboxItem)

    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.manufacturers__list__item}
        >
            <span className={styles.manufacturers__list__item__text}>{item.title}</span>
            <button className={styles.manufacturers__list__item__btn} onClick={removeFilter}>
                <span>
                    <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.5928 4.29002L9.50391 0.378906L10.6211 1.49614L6.71003 5.40725L10.6211 9.31836L9.50391 10.4356L5.5928 6.52449L1.68169 10.4356L0.564453 9.31836L4.47557 5.40725L0.564453 1.49614L1.68169 0.378906L5.5928 4.29002Z" />
                    </svg>
                </span>
            </button>
        </motion.li>
    )
}

export default ManufacturersBlockItem