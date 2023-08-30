import { ModeContext } from '@/context'
import { useStore } from 'effector-react'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CatalogTypes } from '@/types'
import ManufacturersBlockItem from './ManufacturersBlockItem'

import styles from '@/styles/catalogStyle/index.module.scss'

const ManufacturersBlock: React.FC<CatalogTypes.IManufacturersBlockProps> = ({ title, event, manufacturersList }) => {
    const mode = useStore(ModeContext.$mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const checkedItems = manufacturersList.filter(item => item.checked)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles.manufacturers}`}
        >
            <h3 className={`${styles.manufacturers__title} ${darkModeClass}`}>{title}</h3>
            <ul className={styles.manufacturers__list}>
                <AnimatePresence>
                    {checkedItems.map(item =>
                        <ManufacturersBlockItem key={item.id} item={item} event={event} />
                    )}
                </AnimatePresence>
            </ul>
        </motion.div>
    )
}

export default ManufacturersBlock