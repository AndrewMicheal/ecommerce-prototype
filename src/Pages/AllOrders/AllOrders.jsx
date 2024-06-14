import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { baseUrl } from '../../BaseUrl/BaseUrl';
import Loading from '../../Components/Loading/Loading';
import { userContext } from './../../Context/user.context';

export default function AllOrders() {
    const [orders , setOrders] = useState(null);
    const {token} = useContext(userContext);
    const {id} = jwtDecode(token);

    async function getUserOrder() {
        const options = {
            url : `${baseUrl}/api/v1/orders/user/${id}` ,
            metohd: "GET"
        }
        const {data} = await axios.request(options);
        setOrders(data)
    }
    useEffect(() => {
        getUserOrder();
    } , [])
  return (
    <>
    {!orders ? <Loading /> : (
        orders.map((order , index) => {
            return (
                <div key = {index} className="order mt-4 border border-gray-400 rounded-md p-4">
                <div className = "flex justify-between items-center">
                    <div>
                        <h2 className = "text-gray-400">Order ID</h2>
                        <h3 className = "font-bold">#{order.id}</h3>
                    </div>
                    <div>
                        {order.isDelivered ? <span className = "btn-primary inline-block mr-2 bg-lime-500 font-cairo">تم النوصيل</span> :<span className = "btn-primary inline-block mr-2 bg-blue-500 font-cairo">قيد النوصيل</span>}
                        {order.isPaid ? <span className = "btn-primary inline-block bg-lime-500 font-cairo">تم الدفع</span> :<span className = "btn-primary inline-block bg-red-500 font-cairo">غير مدفوع</span>}
                    </div>
                </div>
                <div className = "grid grid-cols-12 gap-3">
                    {order.cartItems.map((item , index) => {
                        return (
                            <div key = {index} className="product col-span-12 xl:col-span-2 md:col-span-4 lg:col-span-3 border border-gray-300 rounded p-3">
                                <img src={item.product.imageCover} className = "w-full" alt="" />
                                <h3>{item.product.title}</h3>
                                <span>{item.price} L.E</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            )
        })
    )}
    </>
  )
}
