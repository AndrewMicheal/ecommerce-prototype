import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../BaseUrl/BaseUrl";
import { userContext } from './user.context';


export let wishListContext = createContext("");

export default function WishListProvider({children}) {
    const {token} = useContext(userContext);
    const [items, setItems] = useState([]);

    async function addWishList(productId) {
        const options = {
            url : `${baseUrl}/api/v1/wishlist` ,
            method : "POST" ,
            headers: {
                token
            } ,
            data: {
                productId
            }
        }
        const {data} = await axios.request(options);
        if(data.status == "success") {
            toast.success(data.message)
            await getAllWishListsIds();
        }
    }

    async function getAllWishListsIds() {
        const options = {
            url : `${baseUrl}/api/v1/wishlist` ,
            method : "GET" ,
            headers: {
                token
            } 
        }
        const {data} = await axios.request(options);
        if(data.status == "success") {
           setItems(data.data);
        }
    }

    return <wishListContext.Provider value = {{addWishList , items , getAllWishListsIds}}>
        {children}
    </wishListContext.Provider>
}