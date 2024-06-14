import axios from 'axios'
import React from 'react'
import Card from '../../Components/Card/Card'
import { baseUrl } from './../../BaseUrl/BaseUrl';
import { useState, useEffect } from 'react';
import Loading from './../../Components/Loading/Loading';

export default function Brands() {

  const [brands , setBrands] = useState(null);

  async function getAllBrands() {
    const {data} = await axios.get(`${baseUrl}/api/v1/brands`);
    setBrands(data.data);
  }
  useEffect(() => {
    getAllBrands();
  } , [])
  return (
    <>
        <p className = "text-center text-primary font-bold text-2xl">All Brands</p>
        {!brands ? <Loading />  : (
        <div className = "mt-9 grid grid-cols-12 gap-4">
           {brands.map(brand =><Card key = {brand._id} title = "brands" text = {brand.name} color = {"#212529"} img = {brand.image}/>)}
         </div>
        )}
       
    </>
  )
}
