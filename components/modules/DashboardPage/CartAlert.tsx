import React from 'react'
import { DashboardTypes } from '@/types'
import { ModeContext } from '@/context'
import { useStore } from 'effector-react'

import styles from '@/styles/dashboardStyle/index.module.scss'
import { CommonUtils } from '@/utils'
import Link from 'next/link'

const CartAlert: React.FC<DashboardTypes.ICartAlertProps> = ({ count, closeAlert }) => {
    const mode = useStore(ModeContext.$mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <>
            <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
                <span>В корзине {count} {CommonUtils.enumerate(count, ['товар', 'товара', 'товаров'])}</span>
                <span>На сумму {CommonUtils.formatPrice(0)} ₽</span>
            </div>
            <div className={styles.dashboard__alert__right}>
                <Link href='/order' legacyBehavior passHref>
                    <a className={styles.dashboard__alert__btn_cart}>Перейти в корзину</a>
                </Link>
                <Link href='/order' legacyBehavior passHref>
                    <a className={styles.dashboard__alert__btn_order}>Оформить заказ</a>
                </Link>
                <button className={styles.dashboard__alert__btn_close} onClick={closeAlert} />
            </div>
        </>
    )
}

export default CartAlert