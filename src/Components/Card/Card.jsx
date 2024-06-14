import React from 'react'
import { useContext } from 'react';
import { categoryContext } from '../../Context/category.context';

export default function Card({title, text , color , img , id}) {
    
    let {getCategoryProduct , handleClick} = useContext(categoryContext);
    
  return (
    <>
    {title == "brands" && title!== "subCategories" ?  (
        <div className="col-span-3 mb-4" >
        <div className = "border border-2 p-5">
            <img src={img} alt="" className = "w-full" />
            <p className = "mt-4 text-center font-semibold text-xl" style = {{color}}>{text}</p>
        </div>
    </div>
    ) : title === "categories" && title !== "subCategories" ? (
        <div className="col-span-4 mb-4 border" onClick = {() => {
            handleClick();
            getCategoryProduct(id);
        }}>
        <div className = "pb-5 p-2">
            <img src={img} alt="" className = "w-full w-96 h-96 object-cover mx-auto" />
            <p className = {`mt-4 text-center font-semibold text-xl ${color}`}>{text}</p>
        </div>
    </div>
    ) : ""}

    {title === "subCategories" ? (
        <div className="col-span-4 mb-4" >
        <div className = "border border-2 p-5">
            <p className = "mt-4 text-center font-semibold text-xl" style = {{color}}>{text}</p>
        </div>
    </div>
    ) : ""}
    </>
  )
}
