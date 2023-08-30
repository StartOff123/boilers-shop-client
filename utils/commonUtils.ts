export const getWindowWidth = () => {
    const { innerWidth: windowWidth } =
        typeof window !== 'undefined' ? window : { innerWidth: 0 }

    return { windowWidth }
}

export const formatPrice = (x: number) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const enumerate = (num: number, dec: Array<string>) => {
    if (num > 100) num = num % 100
    if (num <= 20 && num >= 10) return dec[2]
    if (num > 20) num = num % 10
    return num === 1 ? dec[0] : num > 1 && num < 5 ? dec[1] : dec[2]
}

export const createSelectOption = (value: string | number) => ({
    value,
    label: value
})

export const idGenerator = () => {
    const S4 = () => ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1) 
    return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
    )
}