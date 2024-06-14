import React from 'react'
import img1 from "../../assets/images/slider-image-1.jpeg"
import img2 from "../../assets/images/slider-image-2.jpeg"
import img3 from "../../assets/images/slider-image-3.jpeg"
export default function HomeSlider() {
    
  return (
    <>
       
        <div className = "grid grid-cols-12 mb-8 mt-8">
            <div className = "col-span-8">
                
                 <swiper-container loop={true} style = {{height : "100%"}}>
                    <swiper-slide style = {{height: "100%"}}>
                        <img className = "w-full  object-fit-cover h-full" src={img3} alt="" />
                    </swiper-slide>
                    <swiper-slide style = {{height: "100%"}}>
                        <img className = "w-full  object-fit-cover h-full" src={img2} alt="" />
                    </swiper-slide>
                    <swiper-slide style = {{height: "100%"}}>
                        <img className = "w-full object-fit-cover h-full" src={img1} alt="" />
                    </swiper-slide>
                </swiper-container>
            </div>
            <div className = "col-span-4 bg-lime-200">
                <div className = "h-1/2">
                    <img className = "w-full object-fit-cover h-full" src={img2} alt="" />
                </div>
                <div className = "h-1/2">
                    <img className = "w-full object-fit-cover h-full" src={img1} alt="" />
                </div>
            </div>
        </div>
    </>
  )
}
