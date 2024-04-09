import React, { useContext } from 'react'

import {IoClose} from 'react-icons/io5'
import {CartContext} from '../context/CartContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavItem from '../components/FavItem';

const Favorites = () => {

  const {setIsOpenFav,fav,clearCartFav} = useContext(CartContext);



  
  return (
 
    <div className='w-full h-full px-4 text-white'>
      <div className='overflow-y-auto overflow-x-hidden h-[75vh]'>
        {/* close icon */}
        <div 
          onClick={() => setIsOpenFav(false)}
          className='text-4xl w-20 h-[98px] flex justify-start items-center cursor-pointer'>
          <IoClose/>
        </div>
        <div className='flex flex-col gap-y-10 px-2'>
          {fav.map(item => {
            return <FavItem item={item} selectedSize={item.selectedSize} key={item.id}/>
          })}
        </div>
        </div>
         {/* subtotal and total */}
         {fav.length >=1 &&(
          <div className='px-6 py-10 flex flex-col' >
         
            
          </div>  
          )}

          {/* buttons */}

          <div className='px-6'>
           

        
            <div className='flex justify-between gap-x-4'>
            {fav.length >=1 ?( 
              <button onClick={clearCartFav} className='btn btn-accent hover:bg-accent-hover text-primary'>Sterge produse</button>
              ):(
                <div className='h-full absolute top-0 right-0 left-0 flex justify-center items-center -z-10 flex-col text-white/30'>
              <div className='text-2xl'>Adauga un produs</div>
              <div className='text-6xl'><FavoriteIcon fontSize='30px'/>
              </div>
            </div>

              )}
            </div> 
          
          </div>

    </div>
  )
}

export default Favorites