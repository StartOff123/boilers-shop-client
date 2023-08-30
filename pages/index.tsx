import Head from 'next/head'
import * as React from 'react'
import { AuthPage } from '@/components/templates'
import { useRedirectByUserCheck } from '@/hooks'

const Auth: React.FC = () => {
    const { shouldLoadContent } = useRedirectByUserCheck(true)

    return (
        <>
            <Head>
                <title>Аква Термикс | {shouldLoadContent ? 'Авторизация' : ''}</title>
                <meta charSet='UTF-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <link rel="icon" type='img/svg' sizes='32x32' href="/img/logo.svg" />
            </Head>
            {shouldLoadContent && <AuthPage />}
        </>
    )
}

export default Auth