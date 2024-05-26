import React from 'react'
import ProductSlider from '../components/ProductSlider.js'
import useFetch from '../hooks/useFetch.js'


const LatestProduct = () => {
  
  const {data} = useFetch('/products?populate=*&filters[isNew]=true');


  return (
    <div className='mb-16 container mx-auto'>
    <div className='container mx-auto'>
      <h2 className='h2 mb-6 text-center xl:text-left'>Ultimele modele</h2>
    </div>
    <ProductSlider data={data} />
  </div>
  )
}

export default LatestProduct