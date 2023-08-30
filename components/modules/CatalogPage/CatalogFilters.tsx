import { useMediaQuery } from '@/hooks'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import React from 'react'
import { CatalogTypes } from '@/types'
import { toast } from 'react-toastify'
import { BoilerPartsContext } from '@/context'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { getBoilerPartsFx } from '@/app/api/boilerPartsApi'

const CatalogFilters: React.FC<CatalogTypes.ICatalogFiltersProps> = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    resetFilters,
    isPriceRangeChanged,
    currentPage,
    setIsFilterInQuery
}) => {
    const isMobile = useMediaQuery(820)
    const router = useRouter()
    const boilerManufacturers = useStore(BoilerPartsContext.$biolerManufactirers)
    const partsManufactirers = useStore(BoilerPartsContext.$partsManufactirers)

    const [spinner, setSpinner] = React.useState<boolean>(false)

    const applyFilters = async () => {
        setIsFilterInQuery(true)
        try {
            setSpinner(true)
            const priceFrom = Math.ceil(priceRange[0])
            const priceTo = Math.ceil(priceRange[1])
            const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''
            const boilers = boilerManufacturers.filter(item => item.checked).map(item => item.title)
            const parts = partsManufactirers.filter(item => item.checked).map(item => item.title)
            const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers))
            const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts))
            const boilerQuery = `&boiler=${encodedBoilerQuery}`
            const partsQuery = `&parts=${encodedPartsQuery}`
            const initialPage = currentPage > 1 ? 1 : currentPage

            if (boilers.length && parts.length && isPriceRangeChanged) {
                router.push({
                    query: {
                        ...router.query,
                        boiler: encodedBoilerQuery,
                        parts: encodedPartsQuery,
                        priceFrom,
                        priceTo,
                        page: initialPage
                    }
                }, undefined, { shallow: true })

                const data = await getBoilerPartsFx(`/boiler-parts?limit=20&page=${initialPage}${boilerQuery}${partsQuery}${priceQuery}`)
                BoilerPartsContext.setFilterdBiolerParts(data)
                return
            }

            if (isPriceRangeChanged) {
                router.push({
                    query: {
                        ...router.query,
                        priceFrom,
                        priceTo,
                        page: initialPage
                    }
                }, undefined, { shallow: true })

                const data = await getBoilerPartsFx(`/boiler-parts?limit=20&page=${initialPage}${priceQuery}`)
                BoilerPartsContext.setFilterdBiolerParts(data)
                return
            }

            if (boilers.length && parts.length) {
                router.push({
                    query: {
                        ...router.query,
                        boiler: encodedBoilerQuery,
                        parts: encodedPartsQuery,
                        page: initialPage
                    }
                }, undefined, { shallow: true })

                const data = await getBoilerPartsFx(`/boiler-parts?limit=20&page=${initialPage}${boilerQuery}${partsQuery}`)
                BoilerPartsContext.setFilterdBiolerParts(data)
                return
            }

            if (boilers.length) {
                router.push({
                    query: {
                        ...router.query,
                        boiler: encodedBoilerQuery,
                        page: initialPage
                    }
                }, undefined, { shallow: true })

                const data = await getBoilerPartsFx(`/boiler-parts?limit=20&page=${initialPage}${boilerQuery}`)
                BoilerPartsContext.setFilterdBiolerParts(data)
            }

            if (parts.length) {
                router.push({
                    query: {
                        ...router.query,
                        parts: encodedPartsQuery,
                        page: initialPage
                    }
                }, undefined, { shallow: true })

                const data = await getBoilerPartsFx(`/boiler-parts?limit=20&page=${initialPage}${partsQuery}`)
                BoilerPartsContext.setFilterdBiolerParts(data)
            }
        } catch (error) {
            toast.error((error as Error).message)
        } finally { setSpinner(false) }
    }

    return (
        <>
            {isMobile ?
                <div />
                :
                <CatalogFiltersDesktop
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    setIsPriceRangeChanged={setIsPriceRangeChanged}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    spinner={spinner}
                    resetFilters={resetFilters}
                    applyFilters={applyFilters}
                />
            }
        </>
    )
}

export default CatalogFilters