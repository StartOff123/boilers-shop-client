import React from 'react'
import { BoilerPartsContext } from '@/context'
import { useStore } from 'effector-react'
import { Accordion } from '@/components/elements'
import FilterMaufacturerAccordion from './FilterMaufacturerAccordion'
import PriceRange from './PriceRange'
import { CatalogTypes } from '@/types'

import styles from '@/styles/catalogStyle/index.module.scss'
import spinnerStyles from '@/styles/spinnerStyle/index.module.scss'

const CatalogFiltersDesktop: React.FC<CatalogTypes.ICatalogFiltersDesktopProps> = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    spinner,
    resetFilters,
    applyFilters
}) => {
    const boilerManufacturers = useStore(BoilerPartsContext.$biolerManufactirers)
    const partsManufactirers = useStore(BoilerPartsContext.$partsManufactirers)

    return (
        <div className={styles.catalog__bottom__filters}>
            <h3 className={styles.catalog__bottom__filters__title}>Фильтры</h3>
            <div className={styles.filters__boiler_manufacturers}>
                <FilterMaufacturerAccordion
                    manufacturersList={boilerManufacturers}
                    title='Производитель котлов'
                    updateManufacturer={BoilerPartsContext.updateBiolerManufactirers}
                    setManufacturer={BoilerPartsContext.setBiolerManufactirers}
                />
            </div>
            <div className={styles.filters__price}>
                <Accordion
                    title='Цена'
                    titleClass={styles.filters__manufacturer__btn}
                    arrowOpenClass={styles.open}
                >
                    <div className={styles.filters__manufacturer__inner}>
                        <PriceRange
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                        />
                        <div style={{ height: 24 }} />
                    </div>
                </Accordion>
            </div>
            <div className={styles.filters__parts_manufacturers}>
                <FilterMaufacturerAccordion
                    manufacturersList={partsManufactirers}
                    title='Производитель запчастей'
                    updateManufacturer={BoilerPartsContext.updatePartsManufactirers}
                    setManufacturer={BoilerPartsContext.setPartsManufactirers}
                />
            </div>
            <div className={styles.filters__actions}>
                <button
                    className={styles.filters__actions__show}
                    disabled={resetFilterBtnDisabled}
                    onClick={applyFilters}
                >
                    {spinner ?
                        <span className={spinnerStyles.spinner} style={{ top: 6, left: '47%' }} />
                        : 'Показать'
                    }
                </button>
                <button className={styles.filters__actions__reset} disabled={resetFilterBtnDisabled} onClick={resetFilters}>Сбросить</button>
            </div>
        </div>
    )
}

export default CatalogFiltersDesktop