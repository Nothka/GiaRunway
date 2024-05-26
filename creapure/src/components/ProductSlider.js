import React from 'react'

//import swiper

import {Swiper,SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../slider.css'

// import required Modules

import { Pagination, Navigation} from 'swiper/modules';

import Product from '../components/Product';




const ProductSlider = ({data}) => {
 
  return (
  <Swiper  modules={[Pagination,Navigation]} loop={false} navigation={true} breakpoints={{

    320:{
      slidesPerView: 1,
      spaceBetween: 30
    },
    768:{ //768
      slidesPerView: 2,
      spaceBetween: 30
    },
    1024:{ //1024
      slidesPerView: 2,
      spaceBetween: 30
    },
    1280:{
      slidesPerView:4,
      spaceBetween: 30
      
    },
    1440:{ //1440
      slidesPerView: 4,
      spaceBetween: 30
    },
    1700:{ //1440
      slidesPerView: 5,
      spaceBetween: 30
    }

  }} 
  pagination={{
    clickable:true,

  }}
  
  className='productSlider mx-auto max-w-md md:max-w-2xl xl:max-w-[1330px] xxl:max-w-[1800px] '
  >
    
<>

{data?.map((product) =>{
  return (
   
    <SwiperSlide key={product.id}  >
    <Product product={product}/>
  </SwiperSlide>
);
})}
</>
  </Swiper>
  );
};


export default ProductSlider