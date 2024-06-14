import axios from 'axios';
import React, { useEffect , useContext, useState } from 'react'
import toast from 'react-hot-toast';
import Loading from '../../Components/Loading/Loading';
import { cartContext } from '../../Context/cart.context';
import { baseUrl } from './../../BaseUrl/BaseUrl';
import { userContext } from './../../Context/user.context';

export const WishList = () => {
    const {token} = useContext(userContext);
    const [wishListsData , setWishListsData] = useState(null);
    const { addProductToCart } = useContext(cartContext);

    async function getUserWishLists() {
        const options = {
            url : `${baseUrl}/api/v1/wishlist` ,
            method : "GET" ,
            headers: {
                token
            }
        }
        const {data} = await axios.request(options);
        setWishListsData(data.data);
    }
    useEffect(() => {
        getUserWishLists()
    } , [])

    async function removeWishList(id) {
        try {
            const options = {
                url : `${baseUrl}/api/v1/wishlist/${id}` ,
                method: "DELETE" ,
                headers: {
                    token
                }
            }
            const {data} = await axios.request(options)
            if(data.status == "success") {
                getUserWishLists();
                //  location.reload();
                //  toast.success("product removed successfully");
            }
            toast.success("product removed successfully")
        } catch (error) {
            
        }
    }
  return (
    <>
    <section className = "mt-8 bg-slate-200 p-5 ">
        <h1 className = "text-slate-800 font-bold">My wish List</h1>
      {wishListsData ? wishListsData?.map((item , index) => {
          return (
            <div key = {index} className="product-items flex justify-between items-center my-5">
            <div className = "flex items-center">
                <div>
                    <img className = "w-40 h-40 object-cover" src={item.imageCover} alt=""/>
                </div>
                <div className = "pl-6">
                    <p className = "mb-3 text-slate-800 font-bold">{item.title}</p>
                    <p className = "text-primary font-bold">{item.price} EGP</p>
                    <button onClick = {()=> removeWishList(item.id)} className = "btn-primary bg-red-600 mt-3">
                        <i className = "fa-solid fa-trash mr-2"></i>
                        <span>Remove</span>
                    </button>
                </div>
            </div>
            <div className="">
                <div className = " ">
                    <button onClick = {() => addProductToCart({id:item._id})} className = "btn-primary">Add to cart</button>
                </div>
            </div>
        </div> 
          )
      })  : <Loading />}
    </section>
    </>
  )
}
