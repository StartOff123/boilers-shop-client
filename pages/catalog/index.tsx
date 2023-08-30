import Head from 'next/head'
import * as React from 'react'
import Layout from '@/components/layout/Layout'
import { useRedirectByUserCheck } from '@/hooks'
import { CatalogPage } from '@/components/templates'
import { CatalogTypes } from '@/types'

const Catalog: React.FC<{ query: CatalogTypes.iQueryParams }> = ({ query }) => {
    const { shouldLoadContent } = useRedirectByUserCheck()

    return (
        <>
            <Head>
                <title>Аква Термикс | {shouldLoadContent ? 'Каталог' : ''}</title>
                <meta charSet='UTF-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <link rel="icon" type='img/svg' sizes='32x32' href="/img/logo.svg" />
            </Head>
            {shouldLoadContent &&
                <Layout>
                    <main>
                        <CatalogPage query={query} />
                        <div className='overlay'></div>
                    </main>
                </Layout>
            }
        </>
    )
}

export async function getServerSideProps(context: { query: CatalogTypes.iQueryParams }) {
    return {
        props: { query: { ...context.query } }
    }
}

export default Catalog