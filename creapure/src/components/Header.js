import React, {useContext, useState} from 'react'

import Logo from '../img/logo2.png'
import {SlBag} from 'react-icons/sl';
import {FiMenu} from 'react-icons/fi';
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

import { Link } from 'react-router-dom';

import SearchForm from '../components/SearchForm';
import CategoryNavMobile from '../components/CategoryNavMobile';
import Cart from '../components/Cart';
import { CartContext } from '../context/CartContext';
import Favorite from '@mui/icons-material/Favorite';
import Favorites from '../components/Favorites'


const Header = () => {
  const {isOpen,setIsOpen,itemsAmount}= useContext(CartContext);
  const {isOpenFav,setIsOpenFav,itemsAmountFav}= useContext(CartContext);
  const [CatNavMobile,setCatNavMobile] = useState(false);


  return (<header className='bg-primary py-6 fixed w-full top-0 z-40 lg:relative xl:mb-[80px]'>
    <div className='container mx-auto '>
      <div className='flex flex-row gap-4 lg:items-center justify-around mb-4 xl:mb-0'>
        {/* menu */}

        <div onClick={()=> setCatNavMobile(true)} className='text-3xl xl:hidden cursor-pointer'>
          <FiMenu/>
        </div>
        {/* category nav mobile */}
        <div className={`${CatNavMobile ? 'left-0' : '-left-full'} fixed top-0 bottom-0 z-30 w-full h-screen transition-all duration-200`}>
          <CategoryNavMobile setCatNavMobile={setCatNavMobile}   />
        </div>
        {/* logo */}
        <Link to={'/'}>
        <img src={Logo} alt=''></img>
        </Link>
        {/* searchfrom --show only on desktop */}
        <div className='hidden w-full  xl:flex xl:max-w-[734px] '>
          <SearchForm/>
        </div>
        {/* phone and cart */}
        <div className='flex items-center gap-x-[50px]'>
         
          {/* cart  icon */}
          <div onClick={()=> setIsOpen(!isOpen)} className='relative cursor-pointer'>
            <SlBag className='text-2xl'/>
            {/* Amount */}
            <div className='bg-accent text-primary absolute w-[18px] h-[18px] rounded-full top-3 -right-1 text-[13px] flex justify-center items-center font-bold tracking-[-0.1em]'>{itemsAmount}</div>
          </div>
          {/* cart */}
          <div className={`
          ${isOpen ? 'right-0' : '-right-full' }
          bg-[#0e0f10] shadow-xl fixed top-0 bottom-0 w-full z-10 md:max-w-[500px] transition-all duration-300`}>
            <Cart/>
          </div>
       {/* Heart icon */}

          <div onClick={()=>setIsOpenFav(!isOpenFav)}  className='relative cursor-pointer' >
        <FaRegHeart size={24}  />
        <div className='bg-accent text-primary absolute w-[18px] h-[18px] rounded-full top-3 -right-1 text-[13px] flex justify-center items-center font-bold tracking-[-0.1em]'>{itemsAmountFav}</div>


        </div>
        <div className={`
          ${isOpenFav ? 'right-0' : '-right-full' }
          bg-[#0e0f10] shadow-xl fixed top-0 bottom-0 w-full z-10 md:max-w-[500px] transition-all duration-300`}>
            <Favorites/>
          </div>
      

 {/* user icon */}
 <div className='relative cursor-pointer'>
        <FaRegUser size={24} />

        </div>



        </div>


 

      



       



      </div>
      {/* search from -shown on mobile only */}
      <div className='xl:hidden '>
        <SearchForm/>
      </div>

    </div>
    
  </header>
  
)}

export default Header