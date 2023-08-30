import Head from 'next/head'
import * as React from 'react'
import Layout from '@/components/layout/Layout'
import { DashboardPage } from '@/components/templates'
import { useRedirectByUserCheck } from '@/hooks'

const Dashboard: React.FC = () => {
    const { shouldLoadContent } = useRedirectByUserCheck()

    return (
        <>
            <Head>
                <title>Аква Термикс | {shouldLoadContent ? 'Главная' : ''}</title>
                <meta charSet='UTF-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <link rel="icon" type='img/svg' sizes='32x32' href="/img/logo.svg" />
            </Head>
            {shouldLoadContent &&
                <Layout>
                    <main>
                        <DashboardPage />
                        <div className='overlay'></div>
                    </main>
                </Layout>
            }
        </>
    )
}

export default Dashboard