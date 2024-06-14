import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../BaseUrl/BaseUrl';
import ProductCard from './../../Components/ProductCard/ProductCard';
import Loading from './../../Components/Loading/Loading';
import HomeSlider from '../../Components/HomeSlider/HomeSlider';
import CategorySlider from '../../Components/CategorySlider/CategorySlider';
import ReactPaginate from 'react-paginate';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
    const [products, setProducts] = useState(null);
    const [numberOfPages, setNumberOfPages] = useState(0);
    localStorage.setItem("pageNumber" , "1");
    let page = localStorage.getItem("pageNumber")

    async function getAllProducts(page) {
        return  axios.get(`${baseUrl}/api/v1/products?page=${page}`)
    }

    const {data , isLoading , isFetching , refetch , isError , error} = useQuery({
        queryKey : ["products" , page] ,
        queryFn : () => getAllProducts(page),
        staleTime : 0 ,
        refetchOnMount : false ,
        refetchOnWindowFocus : false
    })


    function handlePageClick(e) {
        let nextPage = e.selected + 1;
        page = nextPage;
        localStorage.setItem("pageNumber" , JSON.stringify(page))
        refetch(page);
    }
    

    console.log("#fetiching");

    if(isLoading) {
        return <Loading />
    }

    return (
        <>
            <HomeSlider />
            <CategorySlider />
                <div>
                    <div className="grid grid-cols-12 gap-4 mb-7">
                        {data.data.data.map((product, index) => <ProductCard key={index} product={product} numberOfPages={numberOfPages} />)}
                    </div>
                    <div className="w-1/2 mx-auto flex justify-center items-center mt-9">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={data.data.metadata.numberOfPages}
                            marginPagesDisplayed={2} 
                            pageRangeDisplayed={4} // range displayed (10-15)
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            disabledClassName={"paginationDisabled"}
                            initialPage={page - 1}
                            previousLinkClassName={"prevClass"}
                            nextLinkClassName={"nextClass"}
                        />
                    </div>
                </div>

        </>
    )
}

