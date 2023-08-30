import React from 'react'
import FooterLogo from './FooterLogo'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks'
import { Accordion } from '@/components/elements'

import styles from '@/styles/footerStyle/index.module.scss'

const footerItems: Array<{ title: string, links: Array<{ title: string, href: string }> }> = [
  {
    title: 'Интернет-магазин',
    links: [
      { title: 'Каталог', href: '/catalog' },
      { title: 'Доставка и оплата', href: '/shipping-payment' },
    ]
  },
  {
    title: 'Компания',
    links: [
      { title: 'О компании', href: '/about' },
      { title: 'Обратная связь', href: '/contacts' },
      { title: 'Оптовым покупателям', href: '/wholesale-byers' },
      { title: 'Контакты', href: '/contacts' },
    ]
  }
]
const payImages: Array<string> = ['pay.png', 'gpay.png', 'master-card.png', 'visa.png']
const socialNetworkLinks: Array<string> = [
  styles.footer__bottom__block__social__item_vk,
  styles.footer__bottom__block__social__item_fb,
  styles.footer__bottom__block__social__item_inst,
  styles.footer__bottom__block__social__item_ytb,
]

const Footer: React.FC = () => {
  const isMedia750 = useMediaQuery(750)
  const isMedia500 = useMediaQuery(500)

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {!isMedia750 && <FooterLogo />}
          <div className={styles.footer__top__inner}>
            {footerItems.map((item, index) =>
              <div key={index} className={styles.footer__top__item}>
                {!isMedia500 &&
                  <>
                    <h3 className={styles.footer__top__item__title}>
                      {item.title}
                    </h3>
                    <ul className={styles.footer__top__item__list}>
                      {item.links.map((item, index) =>
                        <li key={index} className={styles.footer__top__item__list__item}>
                          <Link href={item.href} legacyBehavior passHref>
                            <a className={styles.footer__top__item__list__item__link}>{item.title}</a>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </>
                }
                {isMedia500 &&
                  <Accordion title={item.title} titleClass={styles.footer__top__item__title} arrowOpenClass={styles.open}>
                    <ul className={styles.footer__top__item__list}>
                      {item.links.map((item, index) =>
                        <li key={index} className={styles.footer__top__item__list__item}>
                          <Link href={item.href} legacyBehavior passHref>
                            <a className={styles.footer__top__item__list__item__link}>{item.title}</a>
                          </Link>
                        </li>
                      )}
                    </ul>
                    <div style={{ height: 17 }}></div>
                  </Accordion>
                }
              </div>
            )}
          </div>
          <div className={styles.footer__top__item}>
            <h3 className={styles.footer__top__item__title}>Контакты</h3>
            <ul className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}>
              <li className={styles.footer__top__item__list__item}>
                <Link href="/contacts" passHref legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Наш адрес: </span>
                    <span>г. Златоуст, ул. Тельмана д. 26</span>
                    <span>
                      <svg
                        width="12"
                        height="15"
                        viewBox="0 0 12 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 12.9333L9.3 9.63332C9.9526 8.98066 10.397 8.14914 10.577 7.2439C10.7571 6.33867 10.6646 5.40039 10.3114 4.54769C9.95817 3.695 9.36003 2.96619 8.59261 2.45343C7.82519 1.94068 6.92296 1.66699 6 1.66699C5.07704 1.66699 4.17481 1.94068 3.40739 2.45343C2.63997 2.96619 2.04183 3.695 1.68861 4.54769C1.33539 5.40039 1.24294 6.33867 1.42297 7.2439C1.603 8.14914 2.04741 8.98066 2.7 9.63332L6 12.9333ZM6 14.8187L1.75734 10.576C0.918228 9.73687 0.346791 8.66777 0.115286 7.50389C-0.11622 6.34 0.00260456 5.13361 0.456732 4.03726C0.91086 2.9409 1.6799 2.00384 2.66659 1.34455C3.65328 0.685266 4.81332 0.333374 6 0.333374C7.18669 0.333374 8.34672 0.685266 9.33342 1.34455C10.3201 2.00384 11.0891 2.9409 11.5433 4.03726C11.9974 5.13361 12.1162 6.34 11.8847 7.50389C11.6532 8.66777 11.0818 9.73687 10.2427 10.576L6 14.8187V14.8187ZM6 7.66666C6.35362 7.66666 6.69276 7.52618 6.94281 7.27613C7.19286 7.02608 7.33334 6.68694 7.33334 6.33332C7.33334 5.9797 7.19286 5.64056 6.94281 5.39051C6.69276 5.14046 6.35362 4.99999 6 4.99999C5.64638 4.99999 5.30724 5.14046 5.05719 5.39051C4.80714 5.64056 4.66667 5.9797 4.66667 6.33332C4.66667 6.68694 4.80714 7.02608 5.05719 7.27613C5.30724 7.52618 5.64638 7.66666 6 7.66666ZM6 8.99999C5.29276 8.99999 4.61448 8.71904 4.11438 8.21894C3.61429 7.71884 3.33334 7.04057 3.33334 6.33332C3.33334 5.62608 3.61429 4.9478 4.11438 4.4477C4.61448 3.94761 5.29276 3.66666 6 3.66666C6.70725 3.66666 7.38552 3.94761 7.88562 4.4477C8.38572 4.9478 8.66667 5.62608 8.66667 6.33332C8.66667 7.04057 8.38572 7.71884 7.88562 8.21894C7.38552 8.71904 6.70725 8.99999 6 8.99999Z" />
                      </svg>
                    </span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a href='tel:+7(8095) 555-55-55' className={styles.footer__top__item__list__item__link}>
                  <span>Наш контактный телефон:</span>
                  <span>+7(8095) 555-55-55</span>
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.6667 11.28V13.28C14.6675 13.4657 14.6294 13.6494 14.555 13.8195C14.4807 13.9897 14.3716 14.1424 14.2348 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5847 14.6079 13.3983 14.63 13.2134 14.6133C11.1619 14.3904 9.19137 13.6894 7.46004 12.5667C5.84926 11.5431 4.48359 10.1774 3.46004 8.56665C2.33336 6.82745 1.6322 4.84731 1.41337 2.78665C1.39671 2.60229 1.41862 2.41649 1.4777 2.24107C1.53679 2.06564 1.63175 1.90444 1.75655 1.76773C1.88134 1.63102 2.03324 1.52179 2.20256 1.447C2.37189 1.37221 2.55493 1.33349 2.74004 1.33332H4.74004C5.06357 1.33013 5.37723 1.4447 5.62254 1.65567C5.86786 1.86664 6.02809 2.15961 6.07337 2.47998C6.15779 3.12003 6.31434 3.74847 6.54004 4.35332C6.62973 4.59193 6.64915 4.85126 6.59597 5.10057C6.5428 5.34988 6.41928 5.57872 6.24004 5.75998L5.39337 6.60665C6.34241 8.27568 7.72434 9.65761 9.39337 10.6067L10.24 9.75998C10.4213 9.58074 10.6501 9.45722 10.8994 9.40405C11.1488 9.35088 11.4081 9.37029 11.6467 9.45998C12.2516 9.68568 12.88 9.84224 13.52 9.92665C13.8439 9.97234 14.1396 10.1355 14.3511 10.385C14.5625 10.6345 14.6748 10.953 14.6667 11.28Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a href='mailto:info@zapchasti.com.ru' className={styles.footer__top__item__list__item__link}>
                  <span>E-mail:</span>
                  <span>info@zapchasti.com.ru</span>
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.66659 2.66669H13.3333C14.0666 2.66669 14.6666 3.26669 14.6666 4.00002V12C14.6666 12.7334 14.0666 13.3334 13.3333 13.3334H2.66659C1.93325 13.3334 1.33325 12.7334 1.33325 12V4.00002C1.33325 3.26669 1.93325 2.66669 2.66659 2.66669Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.6666 4L7.99992 8.66667L1.33325 4"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__block__left}>
              <h3 className={styles.footer__bottom__block__title}>Мы принимаем к оплате: </h3>
              <ul className={styles.footer__bottom__block__pay}>
                {payImages.map((src, index) =>
                  <li key={index} className={styles.footer__bottom__block__pay__item}>
                    <img src={`/img/${src}`} alt="Pay" />
                  </li>
                )}
              </ul>
            </div>
            <div className={styles.footer__bottom__block__right}>
              <h3 className={styles.footer__bottom__block__title}>Мы в соцсети: </h3>
              <ul className={styles.footer__bottom__block__social}>
                {socialNetworkLinks.map((src, index) =>
                  <li key={index} className={styles.footer__bottom__block__social__item}>
                    <a href="#" className={src}></a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {isMedia750 && <FooterLogo />}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>© «Детали для газовых котлов» 2021.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer