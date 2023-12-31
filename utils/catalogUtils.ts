import { BoilerPartsTypes } from '@/types'
import { idGenerator } from './commonUtils'
import { Store } from 'effector-next'
import { useStore } from 'effector-react'
import { BoilerPartsContext } from '@/context'

const createManufacturerCheckboxObj = (title: string) => ({
    title,
    checked: false,
    id: idGenerator()
})

export const boilerManufacturers = [
    'Ariston',
    'Chaffoteaux&Maury',
    'Baxi',
    'Bongioanni',
    'Saunier Duval',
    'Buderus',
    'Strategist',
    'Henry',
    'Northwest',
].map(createManufacturerCheckboxObj)

export const partsManufacturers = [
    'Azure',
    'Gloves',
    'Cambridgeshire',
    'Salmon',
    'Montana',
    'Sensor',
    'Lesly',
    'Radian',
    'Gasoline',
    'Croatia',
].map(createManufacturerCheckboxObj)