import React from 'react'
import { useStore } from 'effector-react'
import { ModeContext } from '@/context'
import { ModeToggler, SearchInput } from '@/components/elements'
import Link from 'next/link'
import CartPopup from './CartPopup'

import styles from '@/styles/headerStyle/index.module.scss'
import { useMediaQuery } from '@/hooks'

const HeaderBottom: React.FC = () => {
    const isMedia950 = useMediaQuery(950)
    const mode = useStore(ModeContext.$mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <div className={styles.header__bottom}>
            <div className={`container ${styles.header__bottom__container}`}>
                <h1 className={styles.header__logo}>
                    <Link href='/dashboard' legacyBehavior passHref>
                        <a className={styles.header__logo__link}>
                            <img src="/img/logo.svg" alt="Logo" />
                            <span className={`${styles.header__logo__link__text} ${darkModeClass}`}>Детали для газовых котлов</span>
                        </a>
                    </Link>
                </h1>
                <div className={styles.header__search}>
                    <SearchInput />
                    <button className={`${styles.header__search__btn} ${darkModeClass}`}>
                        <span className={styles.header__search__btn__span}>
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                            </svg>
                        </span>
                    </button>
                </div>
                <div className={styles.header__shopping_cart}>
                    {!isMedia950 && <ModeToggler />}
                    <CartPopup />
                </div>
            </div>
        </div>
    )
}

export default HeaderBottom