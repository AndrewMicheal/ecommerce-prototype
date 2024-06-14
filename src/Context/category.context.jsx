import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from './../BaseUrl/BaseUrl';

export let categoryContext = createContext("");

export default function CategoryProvider({children}) {
    const [categoryProduct , setCategoryProduct] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
      };

    async function getCategoryProduct(id) {
        const {data} = await axios.get(`${baseUrl}/api/v1/categories/${id}/subcategories`);
        setCategoryProduct(data.data);
        console.log(data.data);
    }
    return (
        <categoryContext.Provider value = {{categoryProduct , getCategoryProduct , isClicked  , handleClick}}>
                {children}
        </categoryContext.Provider>
    )
}