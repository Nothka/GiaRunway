import React from 'react'

// import components

import CategoryNav from '../components/CategoryNav';
import MainSlider from '../components/MainSlider';

// import images

import PromoImg1 from '../img/barbati.jpg';
import PromoImg2 from '../img/femei.jpg';

const Hero = () => {
  return (
    <section className='mb-[30px] pt-36 lg:pt-0'>
      <div className='container mx-auto'>
        <div className='flex flex-col gap-y-[30px] xl:flex-row xl:gap-x-[30px]'>
          {/* slidebar */}
          <div>
          <CategoryNav/>
          </div>
          {/* main slider */}
          <div className='w-full max-w-lg lg:max-w-[734px] mx-auto'>
            <MainSlider/>
          </div>
           {/* promo images */}
           <div className='flex flex-col gap-y-[30px] w-full max-w-lg mx-auto h-[500px]  '>
            {/* promo img1 */}
            <div className='grad flex-1 h-[250px] rounded-[8px] overflow-hidden relative  hover:opacity-15'>
              {/* text */}
            
              
       
              {/* img */}
              <img className='w-full h-full object-cover opacity-40 bg-black ' src={PromoImg1} alt=''></img>
              <div className="absolute inset-0 rounded-[8px] flex items-center justify-center align-middle select-none cursor-pointer">
                <p className=''>BARBATI</p>
              </div>
            </div>
               {/* promo img2 */}
               <div className='grad flex-1 h-[250px] rounded-[8px] overflow-hidden relative  hover:opacity-15'>
              {/* text */}
            
        
              {/* img */}
              <img className='w-full h-full object-cover opacity-40 bg-black' src={PromoImg2} alt=''></img>
              <div className="absolute inset-0 rounded-[8px] flex items-center justify-center align-middle select-none cursor-pointer">
              <p className=''> FEMEI </p>
              </div>
            </div>
           </div>
        </div>

      </div>
    </section>
  )
}

export default Hero