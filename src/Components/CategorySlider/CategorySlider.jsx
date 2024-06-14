import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import { baseUrl } from '../../BaseUrl/BaseUrl';
import Loading from './../Loading/Loading';

export default function CategorySlider() {

    async function getAllCategories() {
        return axios.get(`${baseUrl}/api/v1/categories`);
    }

    const {data , isFetching , isLoading , isError , error} = useQuery({
      queryKey : ["categories"] ,
      queryFn : getAllCategories ,
      refetchOnMount : false
    })

    
    const [slidesPerView, setSlidesPerView] = useState(1);


    const [screenSize, setScreenSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    useEffect(() => {
      const handleResize = () => {
        // Calculate the number of slides per view based on the screen width
        const screenWidth = window.innerWidth;
          if (screenWidth <= 480) {
          setSlidesPerView(2); // Adjust this value according to your breakpoints
        }
        else if (screenWidth <= 640) {
          setSlidesPerView(3); // Adjust this value according to your breakpoints
        }
        else if (screenWidth <= 1024) {
          setSlidesPerView(4); // Adjust this value according to your breakpoints
        } else {
          setSlidesPerView(6); // Adjust this value according to your breakpoints
        }
      };
  
      // Call handleResize initially and add event listener
      handleResize();
      window.addEventListener('resize', handleResize);
  
      // Remove event listener when component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Empty dependency array ensures that this effect runs only once after the component is mounted
  
    if (isLoading ) {
      return <Loading />;
    }
  return (
    <>
      
          <section className = "pb-8">
            <h2 className = "mb-3">Shop Popular Categories</h2>
            <swiper-container className="swiper" slides-per-view = {slidesPerView}    loop={true} 
           >
            {data.data.data.map((category , index) => {
                return (
                    <swiper-slide key = {index}  style = {{height: "100%"}}>
                       <div>
                            <img className = "w-full object-cover h-72" src={category.image} alt={category.name} />
                            <h3>{category.name}</h3>
                       </div>
                    </swiper-slide>
                )
            })}
            </swiper-container>
          </section>
    </>
  )
}
