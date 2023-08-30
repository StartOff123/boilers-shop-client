import React from 'react'
import { ElementsTypes } from '@/types'

import styles from '@/styles/dashboardStyle/index.module.scss'

const BrandSliderPrevArrow: React.FC<ElementsTypes.IBrandsSliderArrow> = (props) => {
    return (
        <button
            className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
            onClick={props.onClick}
        >
            <span>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z" />
                </svg>
            </span>
        </button>
    )
}

export default BrandSliderPrevArrow