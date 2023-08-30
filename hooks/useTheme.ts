import React from 'react'
import { ModeContext } from "@/context"
import { useStore } from "effector-react"

const useTheme = () => {
    const mode = useStore(ModeContext.$mode)

    const toggleTheme = () => {
        if (mode === 'dark') {
            localStorage.setItem('mode', JSON.stringify('light'))
            ModeContext.setMode('light')
        } else {
            localStorage.setItem('mode', JSON.stringify('dark'))
            ModeContext.setMode('dark')
        }

    }

    React.useEffect(() => {
        const localTheme = JSON.parse(localStorage.getItem('mode') as string)

        if (localTheme) {
            ModeContext.setMode(localTheme)
        }
    }, [])

    return { toggleTheme }
}

export default useTheme