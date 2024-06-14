import React, { useContext, useState} from 'react'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cart.context';
import { wishListContext } from './../../Context/addwishlist.context';

export default function ProductCard({product}) {
    const {images , title , price , category , ratingsAverage , id} = product;
    const {addProductToCart} = useContext(cartContext);
    const {addWishList} = useContext(wishListContext)
  return (
    <>
    
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden">
        <div className = "relative">
            <img src={images[0]} className = "w-full" alt="" />
            <div className = "absolute opacity-0 hover:opacity-100 transition-opacity duration-300 gap-3 flex justify-center items-center w-full h-full left-0 top-0 bg-black bg-opacity-15">
                <div onClick = {() => addProductToCart({id})} className="icon cursor-pointer hover:scale-110 transition-transform duration-300 w-10 h-10 rounded-full bg-primary text-sm text-white flex items-center justify-center text-center">
                    <i className = "fa-solid fa-cart-shopping"></i>
                </div>
                <Link to = {`/product/${id}`} className="icon cursor-pointer hover:scale-110 transition-transform duration-300 w-10 h-10 rounded-full bg-primary text-center flex items-center justify-center text-sm text-white">
                    <i className = "fa-solid fa-eye"></i>
                </Link>
            </div>
        </div>        
        <div className = "p-3">
            <h3 className = "text-primary">{category.name}</h3>
            <h2 className = "text-lg font-semibold line-clamp-2">{title}</h2>
            <div className = "flex items-center justify-between mt-3">
                <span>{price}</span>
                <div className = "flex gap-1 items-center">
                    <i className = "fa-solid fa-star text-yellow-500"></i>
                    <span>{ratingsAverage}</span>
                </div>
            </div>
            <div onClick = {()=> addWishList(id)} className = "text-right mt-2">
            <i className = "fa-solid fa-heart text-2xl cursor-pointer"></i>
            </div>
        </div>
    </div>
    
    </>
  )
}
