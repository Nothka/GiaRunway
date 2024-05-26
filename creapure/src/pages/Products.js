import React, {useState,useEffect} from 'react'

import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import CategoryNav from '../components/CategoryNav';
import Product from '../components/Product';




const Products = () => {

  const {id} = useParams();

  // get products based on category

  const {data} = useFetch(`/products/?populate=*&filters[categories][id][$eq]=${id}`)
  const [title,setTitle] = useState(null);

  // set the title when data is fetched

  useEffect(()=>{

    if(data){
      setTitle(data[0].attributes.categories.data[0].attributes.title)
    }

  })

  return <div className='mb-16 pt-40 lg:pt-0'>
    <div className='max-w-[1440px] xxl:max-w-[1800px] mx-auto my-8'>
      <div className='flex gap-x-[30px] justify-center'>
        <CategoryNav/>
        <main>
        
          {/* product grid */}
          <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4 gap-[45px] md:gap-[30px]'>
            {data?.map(product=>{
              return <Product product={product} key={product.id} />
            })}
          </div>
          </div>
        
        </main>
      </div>
    </div>
  </div>
  
}

export default Products;