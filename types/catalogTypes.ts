import { Event } from 'effector-next'

export interface IManufacturersBlockProps {
    title: string
    event: Event<IFilterCheckboxItem>
    manufacturersList: IFilterCheckboxItem[]
}

export interface iQueryParams {
    page: string
    first: string
    boiler: string
    parts: string
    priceFrom: string
    priceTo: string
}

export interface IFilterCheckboxItem {
    title: string
    checked: boolean
    id?: string
    event: Event<IFilterCheckboxItem>
}

export interface IFilterManufacturerAccordionProps {
    manufacturersList: IFilterCheckboxItem[]
    title: string | false
    setManufacturer: Event<IFilterCheckboxItem[]>
    updateManufacturer: Event<IFilterCheckboxItem>
}

export interface IPriceRangeProps {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
}

export interface ICatalogFiltersDesktopProps extends IPriceRangeProps {
    resetFilterBtnDisabled: boolean
    spinner: boolean
    resetFilters: () => void
    applyFilters: VoidFunction
}

export interface ICatalogFiltersProps extends IPriceRangeProps {
    resetFilterBtnDisabled: boolean
    resetFilters: () => void
    isPriceRangeChanged: boolean
    currentPage: number
    setIsFilterInQuery: (agr0: boolean) => void 
}

export interface IManufacturersBlockItemProps {
    item: IFilterCheckboxItem
    event: Event<IFilterCheckboxItem>
}