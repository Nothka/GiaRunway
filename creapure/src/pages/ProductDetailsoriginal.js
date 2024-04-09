import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import RelatedProducts from '../components/RelatedProduct';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { CartContext } from '../context/CartContext';
import '../index.css';

import { GrDeliver } from "react-icons/gr";
import { MdOutlineSentimentVerySatisfied } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Typography from '@mui/material/Typography';
import { IoIosArrowDown } from "react-icons/io";



const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const { data } = useFetch(`/products/?populate=*&filters[id][$eq]=${id}`);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ProductQuality = " • Suntem siguri de  calitatea produselor noastre.<br/><br/>• Dacă nu sunteți pe deplin mulțumit, vom face tot ce putem pentru a va ajuta."
  const StandardDelivery = "• Livrare standard FAN Courier <br/><br/> • Articolele disponibile se livrează în 3-5 zile lucrătoare cu FAN Courier."




  useEffect(() => {
    if (data) {
      console.log('Data:', data);
      const formattedImages = data.map(item => {
        if (item.attributes.image && item.attributes.image.data && item.attributes.image.data.length > 0) {
          const thumbnails = item.attributes.image.data.map(imageData => ({
            original: `http://localhost:1337${imageData.attributes.url || ''}`,
            thumbnail: `http://localhost:1337${imageData.attributes.formats.thumbnail.url || ''}`,
          }));
  
          return thumbnails;
        } else {
          console.warn('Image data is missing or empty for the product with ID:', item.id);
          return [];
        }
      }).flat(); // Flatten the array of arrays into a single array
  
      console.log('Formatted Images:', formattedImages);
  
      setGalleryImages([...formattedImages]);
    }
  }, [data]);
  

  const handleImageClick = (event) => {
    const imageContainer = event.target.closest('.image-gallery-image');
    if (imageContainer) {
      // Check if the image is in the gallery
      const galleryContainer = imageContainer.closest('.image-gallery');
      if (galleryContainer && galleryContainer.requestFullscreen) {
        if (document.fullscreenElement !== null) {
          document.exitFullscreen();
          setIsFullscreen(false);
        } else {
          galleryContainer.requestFullscreen();
          setIsFullscreen(true);
        }
      }
    }
  };

  if (!data) {
    return <div className='container mx-auto'>Loading...</div>;
  }

  return (
    <div className='mb-16 pt-44 lg:pt-[28px] xl:pt-0'>
      <div className='container mx-auto'>
        <div className='container'>

      

      
  
        {/* text */}
        <div className='flex flex-col lg:flex-row gap-[30px] mb-[30px] xl:gap-[170px] justify-evenly'>
        
          <div className='rounded-xl lg:w-[50%] xl:w-[45%]  sm:w-full ' onClick={handleImageClick}>
            
            <Gallery items={galleryImages} showPlayButton={false} showFullscreenButton={false} />
            {isFullscreen && (
              <div className="fullscreen-close" onClick={() => { document.exitFullscreen(); setIsFullscreen(false); }} />
                
              
            )}
          </div>
         
        <div className='bg-primary h-fit p-10 w-auto rounded-lg'>

         
           <div className=' bg-primary h-fit rounded-lg flex flex-col  justify-center flex-wrap '>
            

          
            {/* Brand */}
            <a href='#a'>
            <div className='uppercase text-accent text-lg font-medium mb-2 flex justify-center'>{data[0].attributes.brand}</div>
            </a>
            {/* title */}

            <h2 className='h3 sm:h2 mb-4 flex justify-center'>{data[0].attributes.title}</h2>

            {/* Size */}
            <p className='mb-12' dangerouslySetInnerHTML={{ __html: `${data[0].attributes.Size}` }}></p>

            {/* price btn */}
            <div className='md:flex-row flex flex-col items-center gap-x-8 '>
              
              {/* price */}
              <div className='p-4 sm:p-0 text-3xl text-white font-normal sm:font-medium md:font-semibold mx-auto'>{data[0].attributes.price} LEI</div>
              <button onClick={() => addToCart(data, id)} className='btn btn-accent'>Adauga Cos</button>
            </div>

          


            <div className='mt-10 mx-auto md:w-80 lg:w-80'>
              {/* Material */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<IoIosArrowDown color='white' />}
                  aria-controls="shipping-content"
                  id="shipping-header"
                  sx={{ backgroundColor: '#151618',borderBottom: '1px solid white' }}
                >
                  
                  <Typography className='text-white' sx={{ fontWeight: 'semibold' }} >Material si descriere</Typography>
                  
                </AccordionSummary>
                <AccordionDetails className='bg-primary text-white'>
                  <Typography sx={{ fontWeight: 'font-normal',letterSpacing: '2px' }}>
                    {/* material type */}
                    <p className='mb-12' dangerouslySetInnerHTML={{ __html: `${data[0].attributes.description.replace(/•/g, '<br/>•')}` }}></p>

                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Satisfaction icon */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<IoIosArrowDown color='white'/>}
                  aria-controls="satisfaction-content"
                  id="satisfaction-header"
                  sx={{ backgroundColor: '#151618',borderBottom: '1px solid white' }}
                  
                >
                  <Typography className='text-white ' sx={{ fontWeight: 'semibold' }} >Calitatea produsului verificata</Typography>
                </AccordionSummary>
                <AccordionDetails className='bg-primary text-white'>
                  <Typography sx={{ fontWeight: 'font-normal',letterSpacing: '2px' }}>
                   
                    <p className='mb-12' dangerouslySetInnerHTML={{ __html: ProductQuality }}></p>
                   
                  </Typography>
                </AccordionDetails>
              </Accordion>

              {/* Best price icon */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<IoIosArrowDown color='white' />}
                  aria-controls="best-price-content"
                  id="best-price-header"
                  sx={{ backgroundColor: '#151618',borderBottom: '1px solid white'}}
                >
                  <Typography className='text-white' sx={{ fontWeight: 'semibold' }}>Livrare & Retur</Typography>
                </AccordionSummary>
                <AccordionDetails className='bg-primary text-white'>
                  <Typography sx={{ fontWeight: 'font-normal',letterSpacing: '2px' }}>
                    
                     <p className='mb-12' dangerouslySetInnerHTML={{ __html: StandardDelivery }}></p>
                    


                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>



            <div className='mt-10 mx-auto md:w-80'>
                {/* Shippping icon */}
                <a href='#a'>
              <span className='text-sm flex items-center border p-2 rounded-t'>
                    <GrDeliver className='mr-2' />Transport gratuit la comenzi de peste 200 LEI
              </span>
              </a>
              {/* Satisfaction icon */}
              <a href='#a'>
              <span className='text-sm flex items-center border-x p-2'>
                    <MdOutlineSentimentVerySatisfied className='mr-2' /> Produse foarte calitative 
              </span>
              </a>
              {/* Best price icon */}
              <a href='#a'>
              <span className='text-sm flex items-center border p-2 rounded-b sm:text-xs'>
                    <TbPigMoney className='mr-2' /> Cel mai bun pret garantat</span>
              </a>
              </div>
              

              </div>
          </div>
        </div>
        </div>

        {/* Related products */}
        <RelatedProducts categoryTitle={data[0].attributes.categories.data[0].attributes.title} />
      </div>
      </div>
    
  );
};

export default ProductDetails;
