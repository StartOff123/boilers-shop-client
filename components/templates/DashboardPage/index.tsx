import React from 'react'
import { BrandsSlider, DashboardSlider } from '@/components/modules/DashboardPage'
import { BoilerPartsTypes } from '@/types'
import { getBestsellersOrNewPartsFx } from '@/app/api/boilerPartsApi'
import { toast } from 'react-toastify'
import { ModeContext, ShoppingCartContext } from '@/context'
import { useStore } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import CartAlert from '@/components/modules/DashboardPage/CartAlert'

import styles from '@/styles/dashboardStyle/index.module.scss'

const DashboardPage: React.FC = () => {
    const mode = useStore(ModeContext.$mode)
    const shoppingCart = useStore(ShoppingCartContext.$shoppingCart)

    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const [showAlert, setShowAlert] = React.useState<boolean>(!!shoppingCart.length)

    const [newParts, setNewParts] = React.useState<BoilerPartsTypes.IBoilerParts>({} as BoilerPartsTypes.IBoilerParts)
    const [bestsellersParts, setBestsellersParts] = React.useState<BoilerPartsTypes.IBoilerParts>({} as BoilerPartsTypes.IBoilerParts)
    const [spinner, setSpinner] = React.useState<boolean>(false)

    const loadBoilerParts = async () => {
        try {
            setSpinner(true)
            const bestsellers = await getBestsellersOrNewPartsFx('/boiler-parts/bestsellers')
            const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new')

            setBestsellersParts(bestsellers)
            setNewParts(newParts)
        } catch (error) {
            toast.error((error as Error).message)
        } finally { setSpinner(false) }
    }

    const closeAlert = () => setShowAlert(false)

    React.useEffect(() => {
        loadBoilerParts()
    }, [])

    return (
        <section className={styles.dashboard}>
            <div className={`container ${styles.dashboard__container}`}>
                <AnimatePresence>
                    {showAlert &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`${styles.dashboard__alert} ${darkModeClass}`}
                        >
                            <CartAlert count={shoppingCart.length} closeAlert={closeAlert} />
                        </motion.div>
                    }
                </AnimatePresence>
                <div className={styles.dashboard__brands}>
                    <BrandsSlider />
                </div>
                <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>Детали для газовых котлов</h2>
                <div className={styles.dashboard__parts}>
                    <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Хиты продаж</h3>
                    <DashboardSlider items={bestsellersParts.rows || []} spinner={spinner} />
                </div>
                <div className={styles.dashboard__parts}>
                    <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>Новинки</h3>
                    <DashboardSlider items={newParts.rows || []} spinner={spinner} />
                </div>
                <div className={styles.dashboard__about}>
                    <h3 className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}>О компании</h3>
                    <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
                        Инструкции и схемы помогут разобраться в эксплуатации, определить неисправность и правильно выбрать запчасть для ремонта Вашего газового оборудования. Купить запчасть, деталь для ремонта газового котла возможно в любом населенном пункте Российской Федерации: Осуществляем доставку запчасти к газовым котлам в следующие города: Москва, Сан
                    </p>
                </div>
            </div>
        </section>
    )
}

export default DashboardPage