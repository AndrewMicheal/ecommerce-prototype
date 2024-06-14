import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ReactImageGallery from 'react-image-gallery';
import { useParams } from 'react-router';
import { baseUrl } from '../../BaseUrl/BaseUrl';
import Loading from '../../Components/Loading/Loading';
import { cartContext } from '../../Context/cart.context';

export default function ProductDetails() {
    const [details , setDetails] = useState(null);
    const {id} = useParams();
    const {addProductToCart} = useContext(cartContext);

    async function getProductDetails() {
        const {data} = await axios.get(`${baseUrl}/api/v1/products/${id}`);
        setDetails(data.data);
    }
    useEffect(() => {
        getProductDetails();
    } , [])

    const imageItems = details?.images.map((imageUrl) => {
        return {
            original : imageUrl ,
            thumbnail : imageUrl
        }
    });
  return (
    <>
    {details === null ? <Loading /> : (
        <div className = "grid grid-cols-12 gap-6">
            <div className="col-span-3">
                {/* <img src={details.images[0]} className = "w-full" alt="" /> */}
                <ReactImageGallery 
                items = {imageItems}
                showNav = {false}
                showFullscreenButton =  {false}
                showPlayButton =  {false}
                />
            </div>
            <div className="col-span-9">
                <h2 className = "text-2xl font-bold">{details.title}</h2>
                <h3 className = "text-primary font-semibold">{details.category.name}</h3>
                <p className = "mt-3">{details.description}</p>
                <div className = "flex justify-between items-center mt-4">
                    <span>{details.price} L.E</span>
                    <span>
                        <i className = "fa-solid fa-star text-yellow-400 mr-1"></i>
                        {details.ratingsAverage}
                    </span>
                </div>
                <button onClick = {() => addProductToCart({id: details.id})} className = "btn-primary w-full mt-4">Add To Cart</button>
            </div>
        </div>
    )}
    
    </>
  )
}
