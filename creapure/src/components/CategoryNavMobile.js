import React from 'react'
import { FiX } from 'react-icons/fi'

import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const CategoryNavMobile = ({setCatNavMobile}) => {
// get categories

  const {data} = useFetch('/categories');


  return (
    <div className='w-full h-full bg-primary p-8'>
      {/* Close icon */}
      <div 
      onClick={()=>setCatNavMobile(false)}
      className='flex justify-end mb-8 cursor-pointer'>
        <FiX className='text-3xl'/>
      </div>
      <div className='flex flex-col gap-y-8 align-middle'>
        {data?.map(category =>{
          return <Link to={`products/${category.id}`} key={category.id} className='uppercase font-medium'>{category.attributes.title}</Link>
        })}
      </div>
      </div>
  )
}

export default CategoryNavMobile