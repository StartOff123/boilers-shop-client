import React from 'react'
import { useMediaQuery } from '@/hooks'
import { AuthForm } from '@/components/modules'
import { ModeToggler } from '@/components/elements'
import { useStore } from 'effector-react/compat'
import { ModeContext } from '@/context'

import styles from '@/styles/authStyle/index.module.scss'

const AuthPage: React.FC = () => {
    const isMedia850 = useMediaQuery(850)

    const switchCtn = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const switchC1 = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const switchC2 = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const switchCircle1 = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const switchCircle2 = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const aContainer = React.useRef() as React.MutableRefObject<HTMLDivElement>
    const bContainer = React.useRef() as React.MutableRefObject<HTMLDivElement>

    const mode = useStore(ModeContext.$mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const switchForm = () => {
        switchCtn.current.classList.add(styles.is_gx)
        setTimeout(() => {
            switchCtn.current.classList.remove(styles.is_gx)
        }, 1500)

        switchCtn.current.classList.toggle(styles.is_txr);
        switchCircle1.current.classList.toggle(styles.is_txr)
        switchCircle2.current.classList.toggle(styles.is_txr)

        switchC1.current.classList.toggle(styles.is_hidden)
        switchC2.current.classList.toggle(styles.is_hidden)
        aContainer.current.classList.toggle(styles.is_txl)
        bContainer.current.classList.toggle(styles.is_txl)
        bContainer.current.classList.toggle(styles.is_z200)
    }

    return (
        <div className={`${styles.main} ${darkModeClass}`}>
            <div className={styles.mode_toggle}>
                <ModeToggler />
            </div>
            <div ref={aContainer} className={`${styles.container} ${styles.a_container} ${darkModeClass}`} id="a-container">
                <div className={styles.container__inner}>
                    <AuthForm.SignUpForm switchForm={switchForm} />
                </div>
            </div>
            <div ref={bContainer} className={`${styles.container} ${styles.b_container} ${darkModeClass}`} id="b-container">
                <div className={styles.container__inner}>
                    <AuthForm.SignInForm switchForm={switchForm} />
                </div>
            </div>
            <div ref={switchCtn} className={`${styles.switch} ${darkModeClass}`} id="switch-cnt">
                <div ref={switchCircle1} className={`${styles.switch__circle} ${darkModeClass}`}></div>
                <div ref={switchCircle2} className={`${styles.switch__circle} ${styles.switch__circle__t} ${darkModeClass}`}></div>
                <div ref={switchC1} className={styles.switch__container} id="switch-c1">
                    {!isMedia850 && <>
                        <h2 className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}>Добро пожаловать!</h2>
                        <p className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}>Чтобы оставаться на связи с нами, пожалуйста, войдите под своей личной информацией</p>
                        <button onClick={switchForm} className={`${styles.switch__button} ${styles.button} ${styles.switch__btn}  ${darkModeClass}`}>Авторизация</button>
                    </>}
                </div>
                <div ref={switchC2} className={`${styles.switch__container} ${styles.is_hidden}`} id="switch-c2">
                    {!isMedia850 && <>
                        <h2 className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}>Привет, друг!</h2>
                        <p className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}>Введите свои личные данные и начните путешествие с нами</p>
                        <button onClick={switchForm} className={`${styles.switch__button} ${styles.button} ${styles.switch__btn}  ${darkModeClass}`}>Регистрация</button>
                    </>}
                </div>
            </div>
        </div>
    )
}

export default AuthPage