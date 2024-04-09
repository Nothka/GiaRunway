import React, { useContext } from 'react'

import { IoClose } from 'react-icons/io5'

import { Link } from 'react-router-dom'

import Qty from '../components/Qty';
import { CartContext } from '../context/CartContext';

const CartItem = ({item}) => {
  const {removeFromCart} = useContext(CartContext);
  const { selectedSize } = useContext(CartContext);


  
  return (
    <div className='flex gap-x-8'>
      <Link to={`product/${item.id}`} className='w-[100px] h-[100px]'>
      <img src={`http://localhost:1337${item.attributes.image.data[0].attributes.url}`} alt=''></img>
      </Link>
      <div className='flex-1'>
        {/* title and remove icon */}
        <div className='flex gap-x-4 mb-3'>
          <Link to={`product/${item.id}`}>{item.attributes.title}</Link>
          <div 
          onClick={()=>{removeFromCart(item.id)}} 
          className='cursor-pointer text-[24px] hover:text-accent transition-all'>
            <IoClose/>
          </div>
        </div>

        <div className='flex items-center gap-x-12'>
        {/* quantity */}
          <div className='flex gap-x-4 mb-2'>
              <Qty item={item} id={item.id} />
          </div>

             {/* price */}
                 <div className='text-accent text-xl'>
                    {item.attributes.price * item.amount}LEI
                  </div>
        </div>

            <div>
              <span className='text-white'>
                 Marimea: {item.selectedSize}
              </span>
            </div>

        </div>
      </div>
   
  )
}

export default CartItem