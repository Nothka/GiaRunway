import React from 'react'

import useFetch from '../hooks/useFetch'

import ProductSlider from './ProductSlider'



const RelatedProduct = ({categoryTitle}) => {
  //get product by category title

  const {data} = useFetch(`/products?populate=*&filters[categories][title]=${categoryTitle}`);

  return (
    <div className='mb-16'>
      <div className='container mx-auto'>
        <h2 className='h2 mb-6 text-center xl:text-left'>Produse asemanatoare</h2>
        <ProductSlider data={data}/>
      </div>
    </div>
  )
}

export default RelatedProduct