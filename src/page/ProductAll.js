import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom'

const ProductAll = () => {
    const [productList, setProductList] = useState([]);
    const [query, setQuery] = useSearchParams();
    const getProducts = async() => {
      
        //let url = 'http://localhost:4004/products/'
        let searchQuery = query.get('q')||"";
        let url = `https://my-json-server.typicode.com/cheeseryon/escape/products/?q=${searchQuery}`
        /* let url = `http://localhost:4004/products?q=${searchQuery}` */
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        setProductList(data)
    }

    useEffect(() => {
        getProducts()
    }, [query])

  return (
    <div>
      <div>
        {
            productList.map((menu, idx) => (
                <div lg={3} key={idx}>
                    <ProductCard item={menu} />
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default ProductAll
