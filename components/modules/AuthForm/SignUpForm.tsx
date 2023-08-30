import React from 'react'
import { useMediaQuery } from '@/hooks'
import { useForm } from 'react-hook-form'
import { IInputsRegiser } from '@/types/authTypes'
import { signUpFx } from '@/app/api/authApi'
import { ErrorsUtils } from '@/utils'
import { ModeContext } from '@/context'
import { useStore } from 'effector-react'

import styles from '@/styles/authStyle/index.module.scss'
import spinnerStyles from '@/styles/spinnerStyle/index.module.scss'

const SignUpForm = ({ switchForm }: { switchForm: () => void }): React.JSX.Element => {
    const isMedia850 = useMediaQuery(850)

    const [spinner, setStinner] = React.useState<boolean>(false)
    const { register, formState: { errors }, handleSubmit, resetField } = useForm<IInputsRegiser>()

    const mode = useStore(ModeContext.$mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const onSubmit = async (data: IInputsRegiser) => {
        try {
            setStinner(true)
            const userData = await signUpFx({
                url: '/users/signup',
                username: data.name,
                password: data.password,
                email: data.email
            })

            if (!userData) return

            resetField('email')
            resetField('name')
            resetField('password')
            switchForm()
        } catch (error) {
            ErrorsUtils.showAuthError(error)
        } finally { setStinner(false) }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}  ${darkModeClass}`} id="a-form">
            <h2 className={`${styles.form_title} ${styles.title} ${darkModeClass}`}> Регистрация </h2>
            <label className={styles.form__label}>
                <input
                    {...register('name', {
                        required: 'Это поле должно быть заполнено',
                        pattern: {
                            value: /^[а-яА-Яa-zA-ZёЁ]/,
                            message: 'Недопустимое значение'
                        }
                    })}
                    className={styles.form__input}
                    type="text"
                    placeholder="Имя*"
                />
                {errors.name &&
                    <span className={styles.error_alert}>{errors.name?.message}</span>
                }
            </label>
            <label className={styles.form__label}>
                <input
                    {...register('email', {
                        required: 'Это поле должно быть заполнено',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Неверный формат почты'
                        }
                    })}
                    className={styles.form__input}
                    type="email"
                    placeholder="E-mail*"
                />
                {errors.email &&
                    <span className={styles.error_alert}>{errors.email?.message}</span>
                }
            </label>
            <label className={styles.form__label}>
                <input
                    {...register('password', {
                        required: 'Это поле должно быть заполнено',
                        minLength: 8,
                    })}
                    className={styles.form__input}
                    type="password"
                    placeholder="Пароль*"
                />
                {errors.password &&
                    <span className={styles.error_alert}>{errors.password.message}</span>
                }
                {errors.password?.type === 'minLength' &&
                    <span className={styles.error_alert}>Минимальная длинна пароля 8 символов</span>
                }
            </label>
            <button
                className={`${styles.form__button} ${styles.button} ${styles.submit}  ${darkModeClass}`}
            >
                {spinner ? <div className={spinnerStyles.spinner}></div> : 'Создать аккаунт'}
            </button>
            {
                isMedia850 &&
                <button
                    type='button'
                    style={{ marginTop: 20 }}
                    onClick={switchForm}
                    className={`${styles.form__button} ${styles.button} ${styles.switch__btn}  ${darkModeClass}`}
                >
                    Авторизация
                </button>
            }
        </form>
    )
}

export default SignUpForm