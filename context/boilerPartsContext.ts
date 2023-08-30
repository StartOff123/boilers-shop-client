import { BoilerPartsTypes, CatalogTypes } from '@/types'
import { CatalogUtils } from '@/utils'
import { createDomain } from 'effector-next'
import { useStore } from 'effector-react'

const boilerParts = createDomain()

export const setBiolerParts = boilerParts.createEvent<BoilerPartsTypes.IBoilerParts>()

export const setBiolerPartsCheapFirst = boilerParts.createEvent()
export const setBiolerPartsExpensiveFirst = boilerParts.createEvent()
export const setBiolerPartsByPopularity = boilerParts.createEvent()
export const setFilterdBiolerParts = boilerParts.createEvent()
export const setBiolerManufactirers = boilerParts.createEvent<CatalogTypes.IFilterCheckboxItem[]>()
export const updateBiolerManufactirers = boilerParts.createEvent<CatalogTypes.IFilterCheckboxItem>()
export const setPartsManufactirers = boilerParts.createEvent<CatalogTypes.IFilterCheckboxItem[]>()
export const updatePartsManufactirers = boilerParts.createEvent<CatalogTypes.IFilterCheckboxItem>()

const updateManufacturer = (
    manufacturers: CatalogTypes.IFilterCheckboxItem[],
    id: string,
    payload: Partial<CatalogTypes.IFilterCheckboxItem>
) => manufacturers.map(item => {
    if (item.id === id) {
        return {
            ...item,
            ...payload
        }
    }

    return item
})

export const $boilerParts = boilerParts
    .createStore<BoilerPartsTypes.IBoilerParts>({} as BoilerPartsTypes.IBoilerParts)
    .on(setBiolerParts, (_, parts) => parts)
    .on(setBiolerPartsCheapFirst, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => a.price - b.price)
    }))
    .on(setBiolerPartsExpensiveFirst, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => b.price - a.price)
    }))
    .on(setBiolerPartsByPopularity, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => b.popularity - a.popularity)
    }))

export const $biolerManufactirers = boilerParts
    .createStore<CatalogTypes.IFilterCheckboxItem[]>(
        CatalogUtils.boilerManufacturers as CatalogTypes.IFilterCheckboxItem[]
    )
    .on(setBiolerManufactirers, (_, parts) => parts)
    .on(updateBiolerManufactirers, (state, payload) => [
        ...updateManufacturer(state, payload.id as string, { checked: payload.checked })
    ])

export const $partsManufactirers = boilerParts
    .createStore<CatalogTypes.IFilterCheckboxItem[]>(
        CatalogUtils.partsManufacturers as CatalogTypes.IFilterCheckboxItem[]
    )
    .on(setPartsManufactirers, (_, parts) => parts)
    .on(updatePartsManufactirers, (state, payload) => [
        ...updateManufacturer(state, payload.id as string, { checked: payload.checked })
    ])

export const $filterBoilerParts = boilerParts
    .createStore<BoilerPartsTypes.IBoilerParts>({}  as BoilerPartsTypes.IBoilerParts)
    .on(setFilterdBiolerParts, (_, parts) => parts)