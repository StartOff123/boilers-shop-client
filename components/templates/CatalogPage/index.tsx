import React from 'react'
import { useStore } from 'effector-react'
import { BoilerPartsContext, ModeContext } from '@/context'
import { AnimatePresence } from 'framer-motion'
import { FilterSelect, ManufacturersBlock } from '@/components/modules/CatalogPage'
import { getBoilerPartsFx } from '@/app/api/boilerPartsApi'
import { toast } from 'react-toastify'
import { CatalogPage as CatalogPageModule } from '@/components/modules'
import ReactParinate from 'react-paginate'
import { BoilerPartsTypes, CatalogTypes } from '@/types'
import { useRouter } from 'next/router'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'

import styles from '@/styles/catalogStyle/index.module.scss'
import skeletonStyles from '@/styles/skeletonStyle/index.module.scss'

const CatalogPage = ({ query }: { query: CatalogTypes.iQueryParams }): React.JSX.Element => {
    const router = useRouter()
    const mode = useStore(ModeContext.$mode)
    const boilerParts = useStore(BoilerPartsContext.$boilerParts)
    const boilerManufactirers = useStore(BoilerPartsContext.$biolerManufactirers)
    const partsManufactirers = useStore(BoilerPartsContext.$partsManufactirers)
    const filterBoilerParts = useStore(BoilerPartsContext.$filterBoilerParts)

    const isValidOffset = query.page && !isNaN(+query.page) && +query.page > 0

    const [spinner, setSpinner] = React.useState<boolean>(false)
    const [priceRange, setPriceRange] = React.useState<number[]>([1000, 9000])
    const [isFilterInQuery, setIsFilterInQuery] = React.useState<boolean>(false)
    const [isPriceRangeChanged, setIsPriceRangeChanged] = React.useState<boolean>(false)
    const [currentPage, setCurrentPage] = React.useState<number>(isValidOffset ? +query.page : 1)

    const pagesCount = Math.ceil(boilerParts.count / 20)
    const isAnyBiolerManufacturerChacked = boilerManufactirers.some(item => item.checked)
    const isAnyPartsManufacturerChacked = partsManufactirers.some(item => item.checked)
    const resetFilterBtnDisabled = !(isPriceRangeChanged || isAnyBiolerManufacturerChacked || isAnyPartsManufacturerChacked)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const loadBiolerParts = async () => {
        try {
            setSpinner(true)
            const data = await getBoilerPartsFx('/boiler-parts?limit=20&page=1')

            if (!isValidOffset) {
                router.replace({
                    query: {
                        page: 1
                    }
                })
                console.log(1)
                resetPagination(data)
                return
            }

            if (isValidOffset) {
                if (+query.page > Math.ceil(data.count / 20)) {
                    router.push({
                        query: {
                            ...query,
                            page: 1
                        }
                    }, undefined, { shallow: true })

                    resetPagination(data)
                    BoilerPartsContext.setBiolerParts(isFilterInQuery ? filterBoilerParts : data)
                    return
                }

                const page = +query.page
                const result = await getBoilerPartsFx(`/boiler-parts?limit=20&page=${page}`)

                setCurrentPage(page)
                BoilerPartsContext.setBiolerParts(isFilterInQuery ? filterBoilerParts : result)
                return
            }

            setCurrentPage(0)
            BoilerPartsContext.setBiolerParts(isFilterInQuery ? filterBoilerParts : data)
        } catch (error) {
            toast.error((error as Error).message)
        } finally { setSpinner(false) }
    }

    const resetPagination = (data: BoilerPartsTypes.IBoilerParts) => {
        setCurrentPage(1)
        BoilerPartsContext.setBiolerParts(data)
    }

    const handlePageChange = async ({ selected }: { selected: number }) => {
        try {
            const data = await getBoilerPartsFx('/boiler-parts?limit=20&page=1')

            if (selected > pagesCount) {
                resetPagination(data)
                return
            }

            if (isValidOffset && +query.page > Math.ceil(data.count / 20)) {
                resetPagination(data)
                return
            }

            const result = await getBoilerPartsFx(`/boiler-parts?limit=20&page=${selected + 1}`)

            router.push({
                query: {
                    ...router.query,
                    page: selected + 1
                }
            }, undefined, { shallow: true })

            setCurrentPage(selected + 1)
            BoilerPartsContext.setBiolerParts(result)
        } catch (error) {

        }
    }

    const resetFilters = async () => {
        try {
            const data = await getBoilerPartsFx('/boiler-parts?limit=20&page=1')

            BoilerPartsContext.setBiolerManufactirers(
                boilerManufactirers.map(item => ({ ...item, checked: false }))
            )

            BoilerPartsContext.setPartsManufactirers(
                boilerManufactirers.map(item => ({ ...item, checked: false }))
            )

            BoilerPartsContext.setBiolerParts(data)
            setPriceRange([1000, 9000])
            setIsPriceRangeChanged(false)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    React.useEffect(() => {
        loadBiolerParts()
    }, [filterBoilerParts, isFilterInQuery])

    return (
        <section className={styles.catalog}>
            <div className={`container ${styles.catalog__container}`}>
                <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Каталог товаров</h2>
                <div className={`${styles.catalog__top} ${darkModeClass}`}>
                    <AnimatePresence>
                        {isAnyBiolerManufacturerChacked &&
                            <ManufacturersBlock
                                title='Производитель котлов: '
                                manufacturersList={boilerManufactirers}
                                event={BoilerPartsContext.updateBiolerManufactirers}
                            />
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {isAnyPartsManufacturerChacked &&
                            <ManufacturersBlock
                                title='Производитель запчастей: '
                                manufacturersList={partsManufactirers}
                                event={BoilerPartsContext.updatePartsManufactirers}
                            />
                        }
                    </AnimatePresence>
                    <div className={styles.catalog__top__inner}>
                        <button className={styles.catalog__top__reset} disabled={resetFilterBtnDisabled} onClick={resetFilters}>Сбросить фильтр</button>
                        <FilterSelect />
                    </div>
                </div>
                <div className={`${styles.catalog__bottom} ${darkModeClass}`}>
                    <div className={styles.catalog__bottom__inner}>
                        <CatalogFilters
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                            resetFilterBtnDisabled={resetFilterBtnDisabled}
                            resetFilters={resetFilters}
                            isPriceRangeChanged={isPriceRangeChanged}
                            currentPage={currentPage}
                            setIsFilterInQuery={setIsFilterInQuery}
                        />
                        {spinner ?
                            <ul className={skeletonStyles.skeleton}>
                                {Array.from(new Array(20)).map((_, i) =>
                                    <li key={i} className={`${skeletonStyles.skeleton__item} ${darkModeClass}`}>
                                        <div className={skeletonStyles.skeleton__item__light} />
                                    </li>
                                )}
                            </ul>
                            : boilerParts.rows?.length ?
                                <ul className={styles.catalog__list}>
                                    {boilerParts.rows.map(item =>
                                        <CatalogPageModule.CatalogItem key={item.id} item={item} />
                                    )}
                                </ul>
                                :
                                <div className={styles.catalog__bottom__empty}>
                                    <img src="/img/empty.png" alt="Empty" />
                                    <span className={styles.catalog__bottom__empty__text}>Список пуст...</span>
                                </div>
                        }
                    </div>
                    <ReactParinate
                        containerClassName={styles.catalog__bottom__list}
                        pageClassName={styles.catalog__bottom__list__item}
                        pageLinkClassName={styles.catalog__bottom__list__item__link}
                        previousClassName={styles.catalog__bottom__list__prev}
                        nextClassName={styles.catalog__bottom__list__next}
                        breakClassName={styles.catalog__bottom__list__break}
                        breakLinkClassName={styles.catalog__bottom__list__break__link}
                        breakLabel='...'
                        pageCount={pagesCount}
                        forcePage={currentPage - 1}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    )
}

export default CatalogPage