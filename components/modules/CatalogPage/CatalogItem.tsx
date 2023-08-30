import React from 'react'
import { ModeContext, ShoppingCartContext } from '@/context'
import { useStore } from 'effector-react'
import { BoilerPartsTypes } from '@/types'
import Link from 'next/link'

import styles from '@/styles/catalogStyle/index.module.scss'
import spinnerStyles from '@/styles/spinnerStyle/index.module.scss'
import { CommonUtils } from '@/utils'

const CatalogItem: React.FC<{ item: BoilerPartsTypes.IBoilerPart }> = ({ item }) => {
    const mode = useStore(ModeContext.$mode)
    const shoppingCart = useStore(ShoppingCartContext.$shoppingCart)
    const isInCart = shoppingCart.some(cartItem => cartItem.partId === item.id)
    const [spinner, setSpinner] = React.useState<boolean>(false)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <li className={styles.catalog__list__item}>
            <img src={JSON.parse(item.images)[0]} alt={item.name} />
            <div className={styles.catalog__list__item__inner}>
                <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
                    <h3 className={styles.catalog__list__item__title}>{item.name}</h3>
                </Link>
                <span className={styles.catalog__list__item__code}>Артикул: {item.vendor_code}</span>
                <span className={styles.catalog__list__item__price}>{CommonUtils.formatPrice(item.price)} ₽</span>
            </div>
            <button className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''}`} disabled={spinner}>
                {spinner ?
                    <div className={spinnerStyles.spinner} style={{ top: 6, left: 6 }} />
                    : <span>
                        {isInCart ?
                            <svg
                                width="27"
                                height="25"
                                viewBox="0 0 27 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.5 2.5C0.947715 2.5 0.5 2.94772 0.5 3.5C0.5 4.05228 0.947715 4.5 1.5 4.5H3.18121C3.58124 4.5 3.94277 4.7384 4.10035 5.10608L8.94161 16.4023C9.50044 17.7063 10.8963 18.4405 12.2874 18.1623L19.558 16.7082C20.6137 16.4971 21.4753 15.7365 21.8157 14.7151L23.5712 9.44868C24.2187 7.50609 22.7728 5.5 20.7251 5.5H6.44511L5.93864 4.31824C5.46591 3.21519 4.38129 2.5 3.18121 2.5H1.5ZM10.7799 15.6145L7.30225 7.5H20.7251C21.4077 7.5 21.8897 8.1687 21.6738 8.81623L19.9183 14.0827C19.8049 14.4231 19.5177 14.6767 19.1658 14.747L11.8952 16.2012C11.4315 16.2939 10.9662 16.0492 10.7799 15.6145Z"
                                    fill="white"
                                />
                                <path
                                    d="M11.5 22.5C11.5 23.6046 10.6046 24.5 9.5 24.5C8.39543 24.5 7.5 23.6046 7.5 22.5C7.5 21.3954 8.39543 20.5 9.5 20.5C10.6046 20.5 11.5 21.3954 11.5 22.5Z"
                                    fill="white"
                                />
                                <path
                                    d="M21.5 22.5C21.5 23.6046 20.6046 24.5 19.5 24.5C18.3954 24.5 17.5 23.6046 17.5 22.5C17.5 21.3954 18.3954 20.5 19.5 20.5C20.6046 20.5 21.5 21.3954 21.5 22.5Z"
                                    fill="white"
                                />
                                <circle
                                    cx="20.5"
                                    cy="6.5"
                                    r="5.25"
                                    fill="white"
                                    stroke="#04B19E"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M22.5 5.5L19.75 7.5L18.5 6.59091"
                                    stroke="#04B19E"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            :
                            <svg
                                width="24"
                                height="23"
                                viewBox="0 0 24 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.5 0.5C0.947715 0.5 0.5 0.94772 0.5 1.5C0.5 2.05228 0.947715 2.5 1.5 2.5H3.18121C3.58124 2.5 3.94277 2.7384 4.10035 3.10608L8.94161 14.4023C9.50044 15.7063 10.8963 16.4405 12.2874 16.1623L19.558 14.7082C20.6137 14.4971 21.4753 13.7365 21.8157 12.7151L23.5712 7.44868C24.2187 5.50609 22.7728 3.5 20.7251 3.5H6.44511L5.93864 2.31824C5.46591 1.21519 4.38129 0.5 3.18121 0.5H1.5ZM10.7799 13.6145L7.30225 5.5H20.7251C21.4077 5.5 21.8897 6.1687 21.6738 6.81623L19.9183 12.0827C19.8049 12.4231 19.5177 12.6767 19.1658 12.747L11.8952 14.2012C11.4315 14.2939 10.9662 14.0492 10.7799 13.6145Z"
                                    fill="#4E4C4C"
                                />
                                <path
                                    d="M11.5 20.5C11.5 21.6046 10.6046 22.5 9.5 22.5C8.39543 22.5 7.5 21.6046 7.5 20.5C7.5 19.3954 8.39543 18.5 9.5 18.5C10.6046 18.5 11.5 19.3954 11.5 20.5Z"
                                    fill="#4E4C4C"
                                />
                                <path
                                    d="M21.5 20.5C21.5 21.6046 20.6046 22.5 19.5 22.5C18.3954 22.5 17.5 21.6046 17.5 20.5C17.5 19.3954 18.3954 18.5 19.5 18.5C20.6046 18.5 21.5 19.3954 21.5 20.5Z"
                                    fill="#4E4C4C"
                                />
                            </svg>
                        }
                    </span>
                }
            </button>
        </li>
    )
}

export default CatalogItem