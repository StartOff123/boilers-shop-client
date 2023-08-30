import React from 'react'
import Link from 'next/link'

import styles from '@/styles/footerStyle/index.module.scss'

const FooterLogo: React.FC = () => (
    <div className={styles.footer__top__item}>
        <Link href='/dashboard' passHref legacyBehavior>
            <a className={styles.footer__top__item__logo}>
                <img src="/img/logo-footer.svg" alt="FooterLogo" />
                <span className={styles.footer__top__item__logo__text}>Детали для газовых котлов</span>
            </a>
        </Link>
    </div>
)

export default FooterLogo