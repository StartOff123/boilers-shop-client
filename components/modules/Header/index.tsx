import React from 'react'
import HeaderTop from './HeaderTop'
import HeaderBottom from './HeaderBottom'

import styles from '@/styles/headerStyle/index.module.scss'

const Header: React.FC = () => {

    return (
        <header className={styles.header}>
            <HeaderTop />
            <HeaderBottom />
        </header>
    )
}

export default Header