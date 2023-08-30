import React from 'react'
import { ModeContext } from '@/context'
import { CommonTypes } from '@/types'
import { useStore } from 'effector-react'
import Select from 'react-select'
import { CommonUtils, SelectContentsUtils } from '@/utils'
import { BoilerPartsContext } from '@/context'
import { useRouter } from 'next/router'

import { controlStyles, menuListStyles, selectStyles } from '@/styles/catalogStyle/select'
import { optionStyles } from '@/styles/searchInputStyle'

const FilterSelect: React.FC = () => {
    const router = useRouter()
    const mode = useStore(ModeContext.$mode)
    const boilerParts = useStore(BoilerPartsContext.$boilerParts)
    const [categoryOption, setCategoryOption] = React.useState<CommonTypes.SelectOptionType>(null)

    const updateRouteParam = (first: string) => router.push({
        query: {
            ...router.query,
            first
        }
    }, undefined, { shallow: true })

    const handleSortOptionChange = (selectedOption: CommonTypes.SelectOptionType) => {
        setCategoryOption(selectedOption)

        switch ((selectedOption as CommonTypes.ISearchOption).value) {
            case 'Сначала дешевые':
                BoilerPartsContext.setBiolerPartsCheapFirst()
                updateRouteParam('cheap')
                break
            case 'Сначала дорогие':
                BoilerPartsContext.setBiolerPartsExpensiveFirst()
                updateRouteParam('expensive')
                break
            case 'По популярности':
                BoilerPartsContext.setBiolerPartsByPopularity()
                updateRouteParam('popular')
                break
        }
    }

    const updateCategoruOption = (value: string) => setCategoryOption({ value, label: value })

    React.useEffect(() => {
        if (boilerParts.rows) {
            switch (router.query.first) {
                case 'cheap':
                    updateCategoruOption('Сначала дешевые')
                    BoilerPartsContext.setBiolerPartsCheapFirst()
                    break
                case 'expensive':
                    updateCategoruOption('Сначала дорогие')
                    BoilerPartsContext.setBiolerPartsExpensiveFirst()
                    break
                case 'popular':
                    updateCategoruOption('По популярности')
                    BoilerPartsContext.setBiolerPartsByPopularity()
                    break
                default:
                    updateCategoruOption('Сначала дешевые')
                    BoilerPartsContext.setBiolerPartsCheapFirst()
                    break
            }
        }
    }, [boilerParts.rows, router.query.first])

    return (
        <Select
            placeholder='Я ищу...'
            value={categoryOption || CommonUtils.createSelectOption('Сначала дешевые')}
            onChange={handleSortOptionChange}
            styles={{
                ...selectStyles,
                control: (defaultStyles) => ({
                    ...controlStyles(defaultStyles, mode)
                }),
                input: (defaultStyles) => ({
                    ...defaultStyles,
                    color: mode === 'dark' ? '#f2f2f2' : '#222222',
                }),
                menuList: (defaultStyles) => ({
                    ...menuListStyles(defaultStyles, mode)
                }),
                option: (defaultStyles, state) => ({
                    ...optionStyles(defaultStyles, state, mode)
                })
            }}
            isSearchable={false}
            options={SelectContentsUtils.categoryOptions}
        />
    )
}

export default FilterSelect