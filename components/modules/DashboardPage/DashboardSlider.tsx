import React from 'react'
import Slider, { Settings } from 'react-slick'
import { ModeContext } from '@/context'
import { useStore } from 'effector-react'
import { useMediaQuery } from '@/hooks'
import { DashboardTypes } from '@/types'
import Link from 'next/link'
import { CommonUtils } from '@/utils'

import styles from '@/styles/dashboardStyle/index.module.scss'
import skeletonStyles from '@/styles/skeletonStyle/index.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const DashboardSlider: React.FC<DashboardTypes.IDashboardSlider> = ({ items, spinner, goToPartPage }) => {
    const isMedia1366 = useMediaQuery(1366)
    const isMedia1030 = useMediaQuery(1030)
    const isMedia800 = useMediaQuery(800)
    const isMedia768 = useMediaQuery(768)
    const isMedia560 = useMediaQuery(560)

    const mode = useStore(ModeContext.$mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const settings: Settings = {
        dots: false,
        infinite: true,
        slidesToScroll: isMedia768 ? 1 : 2,
        variableWidth: true,
        autoplay: true,
        speed: 500,
        slidesToShow: items.length >= 4 ? (isMedia1030 ? 3 : 4) : items.length - 1,
        arrows: false
    }

    const width = {
        width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344
    }

    React.useEffect(() => {
        const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

        slider.forEach(item => {
            const list = item?.querySelector('.slick-list') as HTMLElement

            list.style.height = isMedia560 ? '276px' : '390px'
            list.style.padding = '0 5px'
            list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0'
        })
    }, [isMedia560, isMedia800, spinner, items.length])

    return (
        <>
            {spinner ? (
                <Slider {...settings} className={styles.dashboard__slider}>
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className={`${skeletonStyles.skeleton__item} ${mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`} style={width}>
                            <div className={skeletonStyles.skeleton__item__light} />
                        </div>
                    ))}
                </Slider>
            ) : items.length ? (
                <Slider {...settings} className={styles.dashboard__slider}>
                    {items.map(item => (
                        <div key={item.id} style={width} className={`${styles.dashboard__slide} ${darkModeClass}`}>
                            <img src={JSON.parse(item.images)[0]} alt={item.name} />
                            <div className={styles.dashboard__slide__inner}>
                                <Link href={goToPartPage ? `/catalog/${item.id}` : '/catalog'} legacyBehavior passHref>
                                    <a>
                                        <h3 className={styles.dashboard__slide__title}>{item.name}</h3>
                                    </a>
                                </Link>
                                <span className={styles.dashboard__slide__code}>Артикул: {item.vendor_code}</span>
                                <span className={styles.dashboard__slide__price}>{CommonUtils.formatPrice(item.price)} ₽</span>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className={styles.dashboard__empty}>
                    <img src="/img/empty.png" alt="Empty" />
                    <span className={styles.dashboard__empty__text}>Список пуст...</span>
                </div>
            )}
        </>
    )
}

export default DashboardSlider