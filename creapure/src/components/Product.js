import React from 'react'

import { Link } from 'react-router-dom'

const Product = ({product}) => {
  // console.log(product);
  // console.log(product.attributes.isNew);
  return <Link to={`/product/${product.id}`} className='flex justify-center'>
    {/* 362 */}
    <div className='grad w-[250px] md:h-[530px] h-[450px] sm:w-[300px] sm:h-[400px] rounded-[8px] overflow-hidden relative group'>
      {/* badge */}

  { product.attributes.isNew ? (

    <div className='absolute bg-accent text-primary text-[12px] font-extrabold uppercase top-4 right-4 px-2 rounded-full z-10'>nou</div>

  ):('')

}


    {/* image */}  
    {/* 200px */}
    {/* 160 160 h w */}

  <div className='w-full md:h-[330px] h-[250px] flex items-center justify-center relative'>
    <img className='md:w-[330px] md:h-[330px]  h-[250px] w-[250px] rounded-xl group-hover:scale-90 transition-all' src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`} alt='' />
  </div>


{/* text */}
  <div className='px-6 pt-8 flex flex-col'>
    {/* pb-8 */}
  {/* category title */}
  <div className='text-sm text-accent capitalize mb-2'>{product.attributes.brand}</div>
  {/* title */}
  <div className='text-[15px] mb-4 lg:mb-9'>{product.attributes.title.substring(0,32)}...</div>
  {/* price */}
  <div className='text-lg text-accent'>{product.attributes.price} LEI</div>


  </div>

  </div>
  </Link>
}

export default Product