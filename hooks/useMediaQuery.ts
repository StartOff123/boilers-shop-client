import React from 'react'
import { CommonUtils } from '@/utils'

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = React.useState(CommonUtils.getWindowWidth())

    const handleResize = () => setWindowWidth(CommonUtils.getWindowWidth())

    React.useEffect(() => {
        window.addEventListener('resize', handleResize, true)

        return () => window.removeEventListener('resize', handleResize, true)
    }, [])

    return { windowWidth, handleResize }
}

const useMediaQuery = (maxWhith: number) => {
    const {
        windowWidth: { windowWidth },
        handleResize
    } = useWindowWidth()

    const [isMedia, setIsMedia] = React.useState(false)

    React.useEffect(() => {
        if(windowWidth <= maxWhith) {
            setIsMedia(true)
        } else {
            setIsMedia(false)
        }
    }, [handleResize, maxWhith, windowWidth])

    return isMedia
}

export default useMediaQuery