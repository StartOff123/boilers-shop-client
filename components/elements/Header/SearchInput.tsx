import React from 'react'
import { ModeContext } from '@/context'
import { useStore } from 'effector-react'
import Select from 'react-select'
import { CommonTypes } from '@/types'

import { controlStyles, inputSearchStyles, menuListStyles, optionStyles } from '@/styles/searchInputStyle'

const SearchInput: React.FC = () => {
    const mode = useStore(ModeContext.$mode)
    const [searchOption, setSearchOption] = React.useState<CommonTypes.SelectOptionType>(null)

    const handleSearchOptionChange = (selectedOption: CommonTypes.SelectOptionType) => {
        setSearchOption(selectedOption)
    }

    return (
        <Select
            placeholder='Я ищу...'
            value={searchOption}
            onChange={handleSearchOptionChange}
            styles={{
                ...inputSearchStyles,
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
            isClearable
            openMenuOnClick={false}
            noOptionsMessage={() => 'Ничего не найдено :('}
            options={[1, 4, 5, 7, 3, 1, 4, 5, 7, 3].map(item => ({ value: item, label: item }))}
        />
    )
}

export default SearchInput