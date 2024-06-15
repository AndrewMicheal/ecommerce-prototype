import axios from 'axios'
import React from 'react'
import Card from '../../Components/Card/Card'
import { baseUrl } from './../../BaseUrl/BaseUrl';
import { useState, useEffect, useContext } from 'react';
import Loading from './../../Components/Loading/Loading';
import { categoryContext } from '../../Context/category.context';

export default function Categories() {
  const [categories, setCategories] = useState(null);
  let { categoryProduct, isClicked } = useContext(categoryContext);

  async function getAllCategories() {
    const { data } = await axios.get(`${baseUrl}/api/v1/categories`);
    setCategories(data.data);
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  return (
    <>
      {!categories ? <Loading /> : (
        <div className="mt-9 grid grid-cols-12 gap-4">
          {categories.map(category => <Card id={category._id} key={category._id} title="categories" text={category.name} color="text-primary" img={category.image} />)}
        </div>
      )}

      {isClicked ? categoryProduct ? (

        <>

          <div className="mt-9 grid grid-cols-12 gap-4">
            {categoryProduct.map(item => <Card key={item._id} title="subCategories" text={item.name} color="#212529" />)}
          </div>
        </>
      ) : <Loading /> : ""}
    </>
  )
}
