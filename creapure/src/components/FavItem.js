import React, { useContext } from 'react'

import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { FiTrash2 } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { IoBag } from "react-icons/io5";
import QtyFav from '../components/QtyFav';
import { CartContext } from '../context/CartContext';

const FavItem = ({item}) => {
  const {removeFromCartFav} = useContext(CartContext);
  const { selectedSize } = useContext(CartContext);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const { data } = useFetch(`/products/?populate=*&filters[id][$eq]=${id}`);

  console.log(selectedSize);
  return (

   
    <div className='flex gap-x-8 border border-gray-200 p-4 rounded-md'>
      <Link to={`product/${item.id}`} className='w-[100px] h-[110px]'>
      <img src={`http://localhost:1337${item.attributes.image.data[0].attributes.url}`} alt=''></img>
      </Link>
      <div className='flex-1'>
        {/* title and remove icon */}
        <div className='flex gap-x-14 mb-3'>
          <Link to={`product/${item.id}`}>{item.attributes.title}</Link>
          <div 
          onClick={()=>{removeFromCartFav(item.id)}} 
          className='cursor-pointer text-[24px] hover:text-accent transition-all'>
            <FiTrash2 color='grey'/>
            
          </div>
          <div>
            {/* adauga in cos dar cere marimea ca adauga null */}
          <button type="button"  onClick={() => addToCart(data,id,selectedSize)}  >
        <IoBag color='grey' size={22}/>
                
                </button>
          </div>
        
        </div>

        <div className='flex items-center gap-x-12'>
        
           
        

             {/* price */}
                 <div className='text-accent text-xl'>
                    {item.attributes.price }LEI
                  </div>
                 
        </div>
        </div>
      </div>
   
  )
}

export default FavItem