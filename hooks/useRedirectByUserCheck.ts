import { checkUserAuthFx } from '@/app/api/authApi'
import { UserContext } from '@/context'
import { useRouter } from 'next/router'
import React from 'react'

const useRedirectByUserCheck = (isAuthPage = false) => {
    const [shouldLoadContent, setShouldLoadContent] = React.useState<boolean>(false)
    const router = useRouter()

    const shouldCheckAuth = React.useRef(true)

    React.useEffect(() => {
        if (shouldCheckAuth.current) {
            shouldCheckAuth.current = false
            checkUser()
        } 
    }, [])

    const checkUser = async () => {
        const user = await checkUserAuthFx('/users/login-check')

        if (isAuthPage) {
            if (!user) {
                setShouldLoadContent(true)
                return
            }

            router.push('/dashboard')
            return
        }

        if (user) {
            UserContext.setUser(user)
            setShouldLoadContent(true)
            return
        }

        router.push('/')
    }

    return { shouldLoadContent }
}

export default useRedirectByUserCheck