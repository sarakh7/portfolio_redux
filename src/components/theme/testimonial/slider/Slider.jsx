import Slide from './../slide/Slide';
import BlackBox from '../../layout/box/black-box/BlackBox';
import { useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './slider.module.css';

const Slider = ({ slides }) => {

    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    let pagination = {
        clickable: true,
        bulletClass: styles.bullet,
        bulletActiveClass: styles.activeBullet,
        renderBullet: function (index, className) {
            return `<span class="${className}"></span>`;
        },
    };

    return (
        <div className={styles.sliderWrapper}>

            <Swiper
                ref={sliderRef}
                modules={[Pagination]}
                pagination={pagination}
                loop={true}
                loopedSlides={slides.length}
                speed={800}
                slidesPerView={1}
                initialSlide={0}

            >
                {
                    slides.map((slide, index) =>
                        <SwiperSlide key={index} ><Slide key={index} content={slide} /></SwiperSlide>
                    )

                }

            </Swiper>

            <div onClick={handlePrev}> <BlackBox
                curve={7}
                size={60}
                className={styles.prev}

            >
                <i className="fas fa-arrow-left"></i>
            </BlackBox >
            </div>

            <div onClick={handleNext}>
                <BlackBox
                    curve={7}
                    size={60}
                    className={styles.next}

                >
                    <i className="fas fa-arrow-right"></i>

                </BlackBox >
            </div>
        </div>
    );
}

export default Slider;
