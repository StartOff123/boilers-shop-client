import React from 'react'
import Link from 'next/link'
import { CityButton, ModeToggler } from '@/components/elements'
import ProfileDropDown from './ProfileDropDown'
import { useMediaQuery, usePopup } from '@/hooks'
import { ModeContext } from '@/context'
import { useStore } from 'effector-react'

import styles from '@/styles/headerStyle/index.module.scss'

const HeaderTop: React.FC = () => {
    const isMedia950 = useMediaQuery(950)
    const { toggleOpen, open, closePopup } = usePopup()
    const mode = useStore(ModeContext.$mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const navLink: Array<{ title: string, href: string }> = [
        { title: 'Доставка и оплата', href: '/shipping-payment' },
        { title: 'О компании', href: '/about' },
        { title: 'Каталог', href: '/catalog' },
        { title: 'Контакты', href: '/contacts' },
        { title: 'Оптовым покупателям', href: '/wholesale-byers' },
    ]

    return (
        <div className={styles.header__top}>
            <div className={`container ${styles.header__top__container}`}>
                {!isMedia950 && <CityButton />}
                {isMedia950 &&
                    <button onClick={toggleOpen} className={`${styles.burger_menu} ${open ? styles.open : ''} ${darkModeClass}`}>
                        <span />
                        <span />
                        <span />
                    </button>
                }
                <nav className={`${styles.header__nav} ${open ? styles.open : ''} ${darkModeClass}`}>
                    <ul className={styles.header__nav__list}>
                        {
                            navLink.map((item, intex) =>
                                <li key={intex} className={styles.header__nav__list__item}>
                                    <Link href={item.href} passHref legacyBehavior>
                                        <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>{item.title}</a>
                                    </Link>
                                </li>
                            )
                        }
                        {isMedia950 &&
                            <>
                                <li className={styles.header__nav__list__item}>
                                    <CityButton />
                                </li>
                                <li>
                                    <ModeToggler />
                                </li>
                            </>
                        }

                    </ul>
                </nav>
                <ProfileDropDown />
            </div>
        </div>
    )
}

export default HeaderTop