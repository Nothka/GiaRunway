import React from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const CategoryNav = () => {
  const { data } = useFetch('/categories');

  return (
    <aside className='hidden xl:flex'>
      <div className='bg-primary flex flex-col w-[286px] h-[500px] rounded-[8px] overflow-hidden'>
        <div className='bg-accent py-4 text-primary uppercase font-semibold flex items-center justify-center'>
          Alege categoria
        </div>
        <div className='flex flex-col gap-y-6 p-6'>
          {data?.map((category) => (
            <Link
              to={`/products/${category.id}`}
              className='cursor-pointer uppercase transition duration-300 hover:text-gray-400'
              key={category.id}
            >
              {category.attributes.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default CategoryNav;
