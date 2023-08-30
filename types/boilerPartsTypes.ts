export interface IBoilerPart {
    id: number
    boiler_manufacturer: string
    price: number
    parts_manufacturer: string
    vendor_code: number
    name: string
    description: string
    images: string
    in_stock: string
    bestseller: boolean
    new: boolean
    popularity: number
    compatibility: string
}

export interface IBoilerParts {
    count: number
    rows: IBoilerPart[]
}