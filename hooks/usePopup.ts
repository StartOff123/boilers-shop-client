import React from 'react'

const usePopup = () => {
    const [open, setOpen] = React.useState<boolean>(false)

    const toggleOpen = () => {
        window.scrollTo(0, 0)
        document.querySelector('.overlay')?.classList.toggle('open')
        document.querySelector('.body')?.classList.add('overflow-hidden')
        setOpen(!open)
    }

    const closePopup = () => {
        document.querySelector('.overlay')?.classList.remove('open')
        document.querySelector('.body')?.classList.remove('overflow-hidden')
        setOpen(false)
    }

    React.useEffect(() => {
        const overlay = document.querySelector('.overlay')

        overlay?.addEventListener('click', closePopup)

        return () => overlay?.removeEventListener('click', closePopup)
    }, [open])

    return {toggleOpen, open, closePopup}
}

export default usePopup