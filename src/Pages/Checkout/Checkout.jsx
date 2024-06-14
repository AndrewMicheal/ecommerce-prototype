import { useFormik } from 'formik'
import React, { useState } from 'react'
import { baseUrl } from '../../BaseUrl/BaseUrl';
import { useContext } from 'react';
import { cartContext } from './../../Context/cart.context';
import { userContext } from './../../Context/user.context';
import axios from 'axios';

export default function Checkout() {
    const {cartInfo , setCartInfo} = useContext(cartContext);
    const {token} = useContext(userContext);
    const [orderType , setOrderType] = useState(null);

    async function createCashOrder(values) {
        const options = {
            url : `${baseUrl}/api/v1/orders/${cartInfo.data._id}` ,
            method : "POST" ,
            headers: {
                token ,
            } , 
            data: {
                values
            }
        }
        let {data} = await axios.request(options);
        setCartInfo([])
    }

    async function createOnlineOrder(values) {
        const options = {
            url : `${baseUrl}/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173` ,
            method : "POST" ,
            headers: {
                token ,
            } , 
            data: {
                values
            }
        }
        let {data} = await axios.request(options);
        if(data.status === "success") {
            // setCartInfo([])
            window.location.href = data.session.url;

        }
    }
    const formik = useFormik({
        initialValues: {
            shippingAddress:{
                    details: "",
                    phone: "",
                    city: ""
                }
        } ,
        onSubmit: (values) => {
            if(orderType === "cash") {
                createCashOrder(values);
            } else {
                createOnlineOrder(values);
            }
        }
    })
  return (
    <>
      <section className = "mt-4">
        <h2 className = 'text-2xl font-bold mb-5'>Shipping Address</h2>
            <form onSubmit = {formik.handleSubmit}>
                <input
                 type="text" 
                 className = "form-control mb-3 w-full" 
                 placeholder = "City"
                 name = "shippingAddress.city"
                 value = {formik.values.shippingAddress.city}
                 onChange = {formik.handleChange}
                 />
                <input 
                type="tel" 
                className = "form-control mb-3 w-full" 
                placeholder = "Phone"
                name = "shippingAddress.phone"
                value = {formik.values.shippingAddress.phone}
                onChange = {formik.handleChange}
                />
                <textarea 
                className = "form-control w-full"
                 placeholder = "details"
                 name = "shippingAddress.details"
                value = {formik.values.shippingAddress.details}
                 onChange = {formik.handleChange}
                 ></textarea>
                <button onClick = {() => setOrderType('cash')} type = "submit" className = "btn-primary bg-blue-500 mr-4">Cash Order</button>
                <button onClick = {() => setOrderType('online')} type = "submit" className = "btn-primary">Online Order</button>
            </form>
      </section>
    </>
  )
}
