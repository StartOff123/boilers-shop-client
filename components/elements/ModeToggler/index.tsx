import React from 'react'
import { useTheme } from '@/hooks'
import { ModeContext } from '@/context'
import { useStore } from 'effector-react'

import styles from '@/styles/modeTogglerStyle/index.module.scss'

const ModeToggler = () => {
    const { toggleTheme } = useTheme()
    const mode = useStore(ModeContext.$mode)

    const handleToggleMode = () => {
        toggleTheme()
        document.body.classList.toggle('dark_mode')
    }

    React.useEffect(() => {
        document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body')
    }, [mode])

    return (
        <div className={styles.theme}>
            <input className={styles.theme__input} type="checkbox" checked={mode === 'light'} onChange={handleToggleMode} />
        </div>
    )
}

export default ModeToggler