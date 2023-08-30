import React from 'react'
import Slider, { Settings } from 'react-slick'
import { ModeContext } from '@/context'
import { useStore } from 'effector-react'
import { useMediaQuery } from '@/hooks'
import { BrandSliderNextArrow, BrandSliderPrevArrow } from '@/components/elements'

import styles from '@/styles/dashboardStyle/index.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const BrandsSlider: React.FC = () => {
    const isMedia768 = useMediaQuery(768)
    const mode = useStore(ModeContext.$mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const settings: Settings = {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        speed: 500,
        nextArrow: <BrandSliderNextArrow modeClass={darkModeClass} />,
        prevArrow: <BrandSliderPrevArrow modeClass={darkModeClass} />
    }

    const brandItems: Array<{ id: number, img: string }> = [
        { id: 1, img: 'brand-1.png' },
        { id: 2, img: 'brand-2.svg' },
        { id: 3, img: 'brand-3.png' },
        { id: 4, img: 'brand-4.png' },
        { id: 5, img: 'brand-4.png' },
        { id: 6, img: 'brand-2.svg' },
        { id: 7, img: 'brand-1.png' },
        { id: 8, img: 'brand-3.png' },
        { id: 9, img: 'brand-3.png' },
        { id: 10, img: 'brand-2.svg' },
        { id: 11, img: 'brand-4.png' },
        { id: 12, img: 'brand-1.png' },
    ]

    React.useEffect(() => {
        const slider = document.querySelector(`.${styles.dashboard__brands__slider}`)
        const list = slider?.querySelector('.slick-list') as HTMLElement

        list.style.height = isMedia768 ? '60px' : '80px'
    }, [isMedia768])

    return (
        <Slider {...settings} className={styles.dashboard__brands__slider}>
            {
                brandItems.map(item =>
                    <div
                        key={item.id}
                        className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
                        style={{ width: isMedia768 ? 124 : 180 }}
                    >
                        <img src={`/img/${item.img}`} alt="Brand" />
                    </div>
                )
            }
        </Slider>
    )
}

export default BrandsSlider