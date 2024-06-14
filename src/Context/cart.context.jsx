import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../BaseUrl/BaseUrl";
import { userContext } from './user.context';

export const cartContext = createContext(null);

export default function CartProvider({children}) {
    const {token} = useContext(userContext);
    const [cartInfo , setCartInfo] = useState(null);

    async function addProductToCart({ id }) {
        try {
            const options = {
                url : `${baseUrl}/api/v1/cart` ,
                method: "POST" ,
                headers: {
                    token
                } , 
                data: {
                    productId: id
                }
            }
            const {data} = await axios.request(options)
            getCartInfo();
            toast.success("product added to cart")
        } catch (error) {
            
        }

    }

    async function removeProductFromCart({ id }) {
        try {
            const options = {
                url : `${baseUrl}/api/v1/cart/${id}` ,
                method: "DELETE" ,
                headers: {
                    token
                }
            }
            const {data} = await axios.request(options)
            if(data.numOfCartItems == 0) {
                setCartInfo([])
            }
            else {
                setCartInfo(data);
            }
            toast.success("product removed successfully")
        } catch (error) {
            
        }

    }

    async function updateProductFromCart({ id , count }) {
        try {
            const options = {
                url : `${baseUrl}/api/v1/cart/${id}` ,
                method: "PUT" ,
                headers: {
                    token ,
                } , 
                data: {
                    count
                }
            }
            const {data} = await axios.request(options)
            setCartInfo(data);

        } catch (error) {
        }

    }

    async function clearCart() {
        try {
            const options = {
                url : `${baseUrl}/api/v1/cart` ,
                method: "DELETE" ,
                headers: {
                    token ,
                }
            }
            const {data} = await axios.request(options)
            if(data.message === "success") {
                setCartInfo([])
            }
            toast.success("deleted")
        } catch (error) {
        }

    }

    async function getCartInfo() {
        try {
            const options = {
                url : `${baseUrl}/api/v1/cart` ,
                method: "GET" ,
                headers: {
                    token
                }
            }
            const {data} = await axios.request(options);
            setCartInfo(data)
        } catch (error) {
            setCartInfo([]);
            if(error.response.data.message.includes("No cart")) {
                setCartInfo([]);
            }
        }
    }
    return <cartContext.Provider value = {{addProductToCart , updateProductFromCart ,  getCartInfo , cartInfo , removeProductFromCart , clearCart}}>
        {children}
    </cartContext.Provider>
}