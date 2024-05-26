import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import BackgroundVideo1 from '../img/background.mp4';
import BackgroundVideo2 from '../img/background2.mp4';
import BackgroundVideo3 from '../img/background3.mp4';

const sliderData = [
  {
    video: BackgroundVideo1,
    pretitle: 'Special offer',
    titlePart1: 'Save 10%',
    titlePart2: 'On your',
    titlePart3: 'first purchase',
    btnText: 'Shop now',
  },
  {
    video: BackgroundVideo2,
    pretitle: 'Special offer',
    titlePart1: 'Save 20%',
    titlePart2: 'On your',
    titlePart3: 'first purchase',
    btnText: 'Shop now',
  },
  {
    video: BackgroundVideo3,
    pretitle: 'Special offer',
    titlePart1: 'Save 30%',
    titlePart2: 'On your',
    titlePart3: 'first purchase',
    btnText: 'Shop now',
  },
];

const MainSlider = () => {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiper) {
        const currentIndex = swiper.activeIndex;
        const nextIndex = currentIndex < sliderData.length - 1 ? currentIndex + 1 : 0;
        swiper.slideTo(nextIndex);
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [swiper]);

  return (
    <Swiper
      loop
      effect='fade'
      onSwiper={setSwiper}
      className='mainSlider h-full bg-primary xl:bg-mainSlider xl:bg-no-repeat max-w-lg lg:max-w-none rounded-[8px] overflow-hidden drop-shadow-2xl relative'
    >
      {sliderData.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className='flex flex-col lg:flex-row h-full relative'>
            {/* video */}
            <video autoPlay loop muted className='w-full h-full object-cover absolute top-0 left-0'>
              <source src={slide.video} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
            {/* text */}
            <div className='w-full lg:flex-1 relative z-10 p-[20px] md:p-[60px]'>
              <div className='uppercase mb-1 text-center md:text-left text-white'>{slide.pretitle}</div>
              <div className='text-xl md:text-[36px] font-semibold uppercase leading-none text-center md:text-left text-white mb-8 xl:mb-20 select-none'>
                <div className='text-accent'>

                {slide.titlePart1}
                <br />
                </div>
                {slide.titlePart2}
                <br />
                {slide.titlePart3}
              </div>
              <div className='xl:absolute xl:mt-14'>

              <button className='h-10 flex items-center justify-center rounded-lg px-4 py-2 text-xs font-bold text-white uppercase  sm:btn btn-accent mx-auto md:mx-0'>{slide.btnText}</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
