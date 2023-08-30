import React from 'react'
import { ModeContext, UserContext } from '@/context'
import { useStore } from 'effector-react'
import { IWrappedComponentProps } from '@/types/commonTypes'
import { AnimatePresence, motion } from 'framer-motion'
import { withClickOutside } from '@/utils'
import { logoutFx } from '@/app/api/authApi'
import { useRouter } from 'next/router'

import styles from '@/styles/profileDropDown/index.module.scss'

const ProfileDropDown = React.forwardRef<HTMLDivElement, IWrappedComponentProps>(
    ({ open, setOpen }, ref) => {
        const router = useRouter()
        const mode = useStore(ModeContext.$mode)
        const user = useStore(UserContext.$user)

        const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

        const toggleProfileDropDown = () => setOpen(!open)

        const handleLogout = async () => {
            await logoutFx('/users/logout')
            router.push('/')
        }

        return (
            <div ref={ref} className={styles.profile}>
                <button className={styles.profile__btn} onClick={toggleProfileDropDown}>
                    <span className={styles.profile__span}>
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M15 0.000671387C6.7166 0.000671387 0 6.71595 0 15C0 23.2841 6.71594 29.9994 15 29.9994C23.2847 29.9994 30 23.2841 30 15C30 6.71595 23.2847 0.000671387 15 0.000671387ZM15 4.48565C17.7409 4.48565 19.962 6.70738 19.962 9.44699C19.962 12.1873 17.7409 14.4083 15 14.4083C12.2604 14.4083 10.0393 12.1873 10.0393 9.44699C10.0393 6.70738 12.2604 4.48565 15 4.48565ZM14.9967 26.0777C12.263 26.0777 9.75929 25.0822 7.82812 23.4343C7.35768 23.033 7.08622 22.4447 7.08622 21.8273C7.08622 19.0488 9.33497 16.8251 12.1141 16.8251H17.8872C20.667 16.8251 22.9072 19.0488 22.9072 21.8273C22.9072 22.4453 22.637 23.0324 22.1659 23.4336C20.2354 25.0822 17.731 26.0777 14.9967 26.0777Z" />
                        </svg>
                    </span>
                </button>
                <AnimatePresence>
                    {open &&
                        <motion.ul
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className={`${styles.profile__dropdown} ${darkModeClass}`}
                            style={{ transformOrigin: 'right top' }}
                        >
                            <li className={styles.profile__dropdown__user}>
                                <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{user.username}</span>
                                <span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>{user.email}</span>
                            </li>
                            <li className={styles.profile__dropdown__item}>
                                <button className={styles.profile__dropdown__item__btn} onClick={handleLogout}>
                                    <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>Выйти</span>
                                    <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                                        <svg
                                            version="1.1"
                                            id="Capa_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            viewBox="0 0 490.3 490.3"
                                            xmlSpace="preserve"
                                        >
                                            <g>
                                                <g>
                                                    <path
                                                        d="M0,121.05v248.2c0,34.2,27.9,62.1,62.1,62.1h200.6c34.2,0,62.1-27.9,62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3
        s-12.3,5.5-12.3,12.3v40.2c0,20.7-16.9,37.6-37.6,37.6H62.1c-20.7,0-37.6-16.9-37.6-37.6v-248.2c0-20.7,16.9-37.6,37.6-37.6h200.6
        c20.7,0,37.6,16.9,37.6,37.6v40.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1
        C27.9,58.95,0,86.75,0,121.05z"
                                                    />
                                                    <path
                                                        d="M385.4,337.65c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l83.9-83.9c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9
        c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l63,63H218.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h229.8l-63,63
        C380.6,325.15,380.6,332.95,385.4,337.65z"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        </motion.ul>
                    }
                </AnimatePresence>
            </div>
        )
    }
)

ProfileDropDown.displayName = 'ProfileDropDown'

export default withClickOutside(ProfileDropDown)