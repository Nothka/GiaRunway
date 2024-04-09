import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../components/RelatedProduct';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem'; 
import  "../magnifier.css"
import Avatar from '@mui/material/Avatar';
import ImageMagnifier from '../components/ImageMagnifier';

const ProductDetails = () => {
  const { addToCart, addToCartFav, fav } = useContext(CartContext);
  const { id } = useParams();
  const { data } = useFetch(`/products/?populate=*&filters[id][$eq]=${id}`);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false); 
  const [isHovered, setIsHovered] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const image =`http://localhost:1337${selectedImage}`;

  const handleReviewClick = () => {
    setShowDescription(false);
  };

  const handleDescriptionClick = () => {
    setShowDescription(true);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const sizesFromAPI = data[0].attributes.Size.split(' ');
      setAvailableSizes(sizesFromAPI);
      setSelectedSize(sizesFromAPI.includes(selectedSize) ? selectedSize : '');
      setSelectedImage(data[0].attributes.image.data[0].attributes.url); // Set initial image
    }
  }, [data, selectedSize]);

  const handleSizeChange = (size) => {
   
    if (availableSizes.includes(size)) {
      setSelectedSize(size);
      
      
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsZoomed(true);
  };

  

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }



  const handleAddToFavorites = () => {
    addToCartFav(data, id);
  };

  const handleHover = () => {
    if (!isAddedToFav) {
      setIsHovered(true);
    }
  };

  const handleUnhover = () => {
    setIsHovered(false);
  };

  const isAddedToFav = fav.some(item => item.id === id);

console.log(selectedImage);
  return (
    
    <div className='mb-16 pt-40 lg:pt-[28px] xl:pt-0'>
    <section className="pb-40"> 
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-20 justify-items-center">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
              <div className='max-w-md flex rounded-lg '> 
              <ImageMagnifier imgUrl={image} className=''/>
             

              </div>
              </div>
            

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  {data[0].attributes.image.data.slice(0, 4).map((image, index) => (
                    <button key={index} type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center" onClick={() => handleImageClick(image.attributes.url)}>
                      <img className="h-full w-full max-w-full object-cover" src={`http://localhost:1337${image.attributes.url}`} alt='' />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-2xl font-bold text-white sm:text-3xl">{data[0].attributes.title}</h1>

              <div className="mt-5 mb-3 flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-4 w-4 align-middle text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <p className="ml-2 text-sm font-medium text-white">1,209 Reviews</p>
                </div>
              </div>
{/* price */}
              <div className="flex items-center ">
              <h1 className="text-xl text-white ">{data[0].attributes.price}</h1>
              <span className="text-xl tracking-wide p-2 text-white ">LEI</span>
              </div>

              <h2 className="mt-8 text-base text-white">Choose size:</h2>
              <div className="mt-3 flex select-none flex-wrap items-center gap-1 justify-center sm:justify-normal">
  {['S', 'M', 'L'].map((size) => (
    <label key={size} className={availableSizes.includes(size) ? 'cursor-pointer' : 'cursor-not-allowed'}>
      <input
        type="radio" 
        name="size"  
        value={size}
        className="peer sr-only"
        checked={selectedSize === size}
        onChange={() => handleSizeChange(size)}
        disabled={!availableSizes.includes(size)}
      />
      <p
        className={`rounded-lg border px-6 py-2 font-bold ${
          selectedSize === size ? 'bg-black text-white' : 'text-gray-600'
        } ${availableSizes.includes(size) ? '' : 'text-gray-400'}`}
      >
        {size}
      </p>
    </label>
  ))}
</div>

  <div className="mt-10 flex flex-col items-center justify-center space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
      

  
      <div className="flex items-center justify-between gap-10">
   
      <button
                type="button"
                onClick={handleAddToFavorites}
                className="inline-flex items-center justify-center rounded-md px-3 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out mr-1"
                onMouseEnter={handleHover}
                onMouseLeave={handleUnhover}
              >
                {isAddedToFav || isHovered ? (
                  <FavoriteIcon fontSize="large" className='text-red-600' />
                ) : (
               
                  <FavoriteBorderIcon fontSize="large" />
                )}
              </button>

                <button type="button" disabled={!selectedSize} onClick={() => addToCart(data,id,selectedSize)} className={`inline-flex items-center justify-center rounded-md border border-transparent bg-accent bg-none px-6 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-accent/90 
  ${!selectedSize && 'cursor-not-allowed'} // Disable cursor if no size selected
  `} >
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to cart
                </button>
              
              </div>
     
              </div>

              <ul className="mt-8 space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-white">
                  <svg className="mr-2 block h-5 w-5 align-middle text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                  </svg>
                  Transport gratuit la comenzi de peste 250 LEI
                </li>

                <li className="flex items-center text-left text-sm font-medium text-white">
                  <svg className="mr-2 block h-5 w-5 align-middle text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Cel mai bun pret
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="border-b border-gray-300">
                <nav className="flex gap-4">
                  <a href="#a" onClick={handleDescriptionClick} title="" className="border-b-2 border-transparent py-4 text-sm font-medium text-white hover:border-accent hover:text-accent"> Descriere</a>

                  <a href="#b" onClick={handleReviewClick} title="" className="inline-flex b-2 items-center border-b-2 border-transparent py-4 text-sm font-medium text-white hover:border-accent hover:text-accent">
                    Review-uri
                    <span className="ml-2 block rounded-full bg-accent px-2 py-px text-xs font-bold text-gray-100"> 1,209 </span>
                  </a>
                </nav>
              </div>

              {showDescription ? (
              <div className="mt-8 flow-root sm:mt-12">
                <h1 className="text-3xl font-bold">Descrierea Produsului</h1>
                <p className="mt-4">{data[0].attributes.description}</p>
                <h1 className="mt-8 text-3xl font-bold">Livrare</h1>
                <p className="mt-4">Articolele disponibile se livrează în 3-5 zile lucrătoare cu FAN Courier.</p>
                <p className="mt-4">GiaRunway oferă livrare gratuită pentru comenzi începând cu 249,90 lei. De asemenea, oferim retur gratuit și acoperim costul de ambalare a produselor. Comenzile cu mai multe produse pot fi expediate separat.</p>
              </div> ) : (

              <div className="mt-8 flow-root sm:mt-12">
                <h1 className="text-3xl font-bold">Adauga review</h1>

                <div className='w-[100%] p-4 '>
                  <div className='flex justify-around '>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  />
                
                  <textarea className='w-[80%] sm:w-[85%] h-[40px] sm:h-[45px] rounded-3xl  bg-gray-400/30 content-center p-4 resize-none' placeholder='Adauga un comentariu...'></textarea>
                </div>
                </div>
                
                <h1 className="mt-8 text-3xl font-bold">Comentarii</h1>
                <p className="mt-4">Articolele disponibile se livrează în 3-5 zile lucrătoare cu FAN Courier.</p>
                <p className="mt-4">GiaRunway oferă livrare gratuită pentru comenzi începând cu 249,90 lei. De asemenea, oferim retur gratuit și acoperim costul de ambalare a produselor. Comenzile cu mai multe produse pot fi expediate separat.</p>
                <div className='w-[100%] p-4 '>
                  <div className='flex justify-around '>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"  />
                
                  <textarea className='w-[80%] sm:w-[85%] h-[40px] sm:h-[45px] rounded-3xl  bg-gray-400/30 content-center p-4 resize-none' placeholder='Adauga un comentariu...'></textarea>
                </div>
                </div>
              </div>
 )}




            </div>
          </div>
        </div>
      </section>
      <RelatedProducts categoryTitle={data[0].attributes.categories.data[0].attributes.title} />
   
  
    </div>
  );
}

export default ProductDetails;

