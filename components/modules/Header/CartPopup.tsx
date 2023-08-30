import React from 'react'
import { ModeContext, ShoppingCartContext } from '@/context'
import { useStore } from 'effector-react'
import { CommonTypes } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import { withClickOutside } from '@/utils'
import Link from 'next/link'

import styles from '@/styles/cartPopupStyle/index.module.scss'

const CartPopup = React.forwardRef<HTMLDivElement, CommonTypes.IWrappedComponentProps>(
    ({ open, setOpen }, ref) => {
        const mode = useStore(ModeContext.$mode)
        const shoppingCart = useStore(ShoppingCartContext.$shoppingCart)
        const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

        const toggleCartDropDown = () => setOpen(!open)

        return (
            <div className={styles.cart} ref={ref}>
                <button className={`${styles.cart__btn} ${darkModeClass}`} onClick={toggleCartDropDown}>
                    {!!shoppingCart.length &&
                        <span className={styles.cart__btn__count}>{shoppingCart.length}</span>
                    }
                    <span className={styles.cart__svg}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <span className={styles.cart__text}>Корзина</span>
                </button>
                <AnimatePresence>
                    {open &&
                        <motion.ul
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className={`${styles.cart__popup} ${darkModeClass}`}
                            style={{ transformOrigin: 'right top' }}
                        >
                            <h3 className={`${styles.cart__popup__title} ${darkModeClass}`}>Корзина</h3>
                            <ul className={styles.cart__popup__list}>
                                {shoppingCart.length
                                    ? shoppingCart.map((item) => <li key={item.id}></li>)
                                    : <li className={styles.cart__popup__empty}>
                                        <span className={`${styles.cart__popup__empty__text} ${darkModeClass}`}>Корзина пуста</span>
                                    </li>
                                }
                            </ul>
                            <div className={styles.cart__popup__footer}>
                                <div className={styles.cart__popup__footer__total}>
                                    <span className={`${styles.cart__popup__footer__text} ${darkModeClass}`}>Сумма заказа: </span>
                                    <span className={`${styles.cart__popup__footer__price} ${darkModeClass}`}>0</span>
                                </div>
                                <Link href='/order' legacyBehavior passHref>
                                    <button className={styles.cart__popup__footer__btn} disabled={!shoppingCart.length}>Оформить заказ</button>
                                </Link>
                            </div>
                        </motion.ul>
                    }
                </AnimatePresence>
            </div>
        )
    }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)