import React from 'react'
import { useMediaQuery } from '@/hooks'
import { useForm } from 'react-hook-form'
import { IInputsLogin } from '@/types/authTypes'
import { signInFx } from '@/app/api/authApi'
import { ErrorsUtils } from '@/utils'
import { ModeContext } from '@/context'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'

import styles from '@/styles/authStyle/index.module.scss'
import spinnerStyles from '@/styles/spinnerStyle/index.module.scss'

const SignInForm = ({ switchForm }: { switchForm: () => void }): React.JSX.Element => {
  const isMedia850 = useMediaQuery(850)

  const [spinner, setStinner] = React.useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, resetField } = useForm<IInputsLogin>()
  const route = useRouter()

  const mode = useStore(ModeContext.$mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const onSubmit = async (data: IInputsLogin) => {
    try {
      setStinner(true)
      await signInFx({
        url: '/users/login',
        username: data.email,
        password: data.password
      })

      resetField('email')
      resetField('password')
      route.push('/dashboard')
    } catch (error) {
      ErrorsUtils.showAuthError(error)
    } finally { setStinner(false) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}  ${darkModeClass}`} id="b-form">
      <h2 className={`${styles.form_title} ${styles.title} ${darkModeClass}`}>Авторизация</h2>
      <label className={styles.form__label}>
        <input
          {...register('email', {
            required: 'Это поле должно быть заполнено',
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
          })}
          className={styles.form__input}
          type="password"
          placeholder="Пароль*"
        />
        {errors.password &&
          <span className={styles.error_alert}>{errors.password?.message}</span>
        }
      </label>
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}  ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner}></div> : 'Войти'}
      </button>
      {isMedia850 &&
        <button style={{ marginTop: 20 }} onClick={switchForm} className={`${styles.form__button} ${styles.button} ${styles.switch__btn}  ${darkModeClass}`}>Регистрация</button>
      }
    </form>
  )
}

export default SignInForm