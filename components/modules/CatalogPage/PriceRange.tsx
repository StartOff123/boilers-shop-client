import React from 'react'
import { Range, getTrackBackground } from 'react-range'
import { CatalogTypes } from '@/types'

import styles from '@/styles/catalogStyle/index.module.scss'

const STEP = 0.1
const MIN = 0
const MAX = 10000

const PriceRange: React.FC<CatalogTypes.IPriceRangeProps> = ({ priceRange, setPriceRange, setIsPriceRangeChanged }) => {
    const handlePriceRangeChange = (values: number[]) => {
        setIsPriceRangeChanged(true)
        setPriceRange(values)
    }
    return (
        <div className={styles.filters__price}>
            <div className={styles.filters__price__inputs}>
                <input type="text" value={Math.ceil(priceRange[0])} placeholder='от 00' readOnly />
                <span className={styles.filters__price__inputs__border}></span>
                <input type="text" value={Math.ceil(priceRange[1])} placeholder='до 00' readOnly />
            </div>
            <Range
                values={priceRange}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={handlePriceRangeChange}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: "auto",
                            display: "flex",
                            width: "100%",
                            padding: '0 10px'
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: "5px",
                                width: "100%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                    values: priceRange,
                                    colors: ["#b1cefa", "#247cc8", "#b1cefa"],
                                    min: MIN,
                                    max: MAX
                                }),
                                alignSelf: "center"
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style
                        }}
                    >
                        <div
                            style={{
                                height: 20,
                                width: 20,
                                borderRadius: '50%',
                                background: '#ffffff',
                                border: '3px solid #1c629e',
                                boxShadow: '0 12px 8px -6px rgba(174, 181, 239, .2)'
                            }}
                        >

                        </div>
                    </div>
                )}
            />
        </div>
    )
}

export default PriceRange