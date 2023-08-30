import React from "react"
import { CommonTypes } from "@/types"

export default function withClickOutside(
    WrappedComponent: React.ForwardRefExoticComponent<
        CommonTypes.IWrappedComponentProps & React.RefAttributes<HTMLDivElement>
    >
) {
    const Component = () => {
        const [open, setOpen] = React.useState<boolean>(false)
        const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>

        React.useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (!ref.current.contains(e.target as HTMLDivElement)) {
                    setOpen(false)
                }
            }

            document.addEventListener('mousedown', handleClickOutside)

            return () => document.removeEventListener('mousedown', handleClickOutside)
        }, [ref])

        return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
    }

    return Component
}