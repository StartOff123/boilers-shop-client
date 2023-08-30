import { MultiValue, SingleValue } from 'react-select'

export interface IWrappedComponentProps {
    open: boolean
    setOpen: (arg0: boolean) => void
}

export interface ISearchOption {
    value: string | number
    label: string | number
}

export type SelectOptionType = MultiValue<ISearchOption> | SingleValue<ISearchOption> | null

export interface IAccordion {
    children: React.ReactNode
    title: string | false
    titleClass: string
    arrowOpenClass: string
    isMobileForFilters?: boolean
    hideArrowClass?: string
}

export interface ILayoutProps {
    children: React.ReactNode
    
}