import { CommonTypes } from '@/types'
import { CSSObjectWithLabel, GroupBase, OptionProps, StylesConfig } from 'react-select'

export const controlStyles = (defaultStyles: CSSObjectWithLabel, theme: string): CSSObjectWithLabel => ({
    ...defaultStyles,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: '1px solid #9e9e9e',
    height: 40,
    boxShadow: 'none',
    borderRadius: 4,
    '&:hover': {
        borderColor: '#9e9e9e'
    },
    '& .css-1dimb5e-singleValue': {
        color: theme === 'dark' ? '#f2f2f2' : '#222222'
    },
    borderRight: 'none',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
})

export const menuListStyles = (defaultStyles: CSSObjectWithLabel, theme: string): CSSObjectWithLabel => ({
    ...defaultStyles,
    boxShadow: '0 4px 20px rgb(0 0 0 / 7%)',
    borderRadius: 4,
    height: 'auth',
    overflow: 'hidden',
    backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f2f2f2',
    width: 'calc(100% + 40px)',
    minHeight: 30
})

export const optionStyles = (
    defaultStyles: CSSObjectWithLabel,
    state: OptionProps<CommonTypes.ISearchOption, boolean, GroupBase<CommonTypes.ISearchOption>>,
    theme: string
): CSSObjectWithLabel => {
    const backgroundHoverForLightMode = state.isSelected
        ? state.isSelected
            ? '#9e9e9e'
            : '#f2f2f2'
        : state.isSelected
            ? '#f2f2f2'
            : '#9e9e9e'

    const backgroundHoverForDarkMode = state.isSelected
        ? state.isSelected
            ? '#f2f2f2'
            : '#9e9e9e'
        : state.isSelected
            ? '#9e9e9e'
            : '#f2f2f2'

    const colorHoverForLightMode = state.isSelected
        ? state.isSelected
            ? '#f2f2f2'
            : '#9e9e9e'
        : state.isSelected
            ? '#9e9e9e'
            : '#f2f2f2'

    const colorHoverForDarkMode = state.isSelected
        ? state.isSelected
            ? '#9e9e9e'
            : '#f2f2f2'
        : state.isSelected
            ? '#f2f2f2'
            : '#9e9e9e'

    return {
        ...defaultStyles,
        cursor: 'pointer',
        padding: '6px 12px',
        margin: 0,
        '&:hover': {
            backgroundColor:
                theme === 'dark'
                    ? backgroundHoverForDarkMode
                    : backgroundHoverForLightMode,
            color: theme === 'dark' ? colorHoverForDarkMode : colorHoverForLightMode,
        },
        backgroundColor:
            theme === 'dark'
                ? state.isSelected
                    ? '#ffffff'
                    : '#2d2d2d'
                : state.isSelected
                    ? '#2d2d2d'
                    : '#ffffff',
        color:
            theme === 'dark'
                ? state.isSelected
                    ? '#222222'
                    : '#f2f2f2'
                : state.isSelected
                    ? '#f2f2f2'
                    : '#222222',
    }
}

export const inputSearchStyles: StylesConfig<CommonTypes.ISearchOption, boolean, GroupBase<CommonTypes.ISearchOption>> = {
    indicatorSeparator: () => ({
        border: 'none'
    }),
    dropdownIndicator: () => ({
        display: 'none'
    }),
    menuList: (defaultStyles) => ({
        ...defaultStyles,
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 30,
        '&::-webkit-scrollbar': {
            width: 8
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#454545',
            borderRadius: 3
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: 'grey',
        },
    }),
    placeholder: (defaultStyles) => ({
        ...defaultStyles,
        color: '#b9babb'
    }),
}