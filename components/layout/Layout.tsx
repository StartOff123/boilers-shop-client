import React from 'react'
import { CommonTypes } from '@/types'
import { Footer, Header } from '../modules'

const Layout: React.FC<CommonTypes.ILayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout