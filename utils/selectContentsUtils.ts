import { createSelectOption } from './commonUtils'

export const categoryOptions: Array<{value: string | number, label: string | number}> = [
    'Сначала дешевые',
    'Сначала дорогие',
    'По популярности'
].map(createSelectOption)