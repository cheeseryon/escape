import React, { useEffect, useState } from 'react';
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';
import GenreList from '../component/GenreList';
import AreaList from '../component/AreaList'
import { useSelector } from 'react-redux';

const ProductAll = (props) => {
    const [topInnerBoder , setTopInnerBoder] = useState(false);


    const [prodList, setProductList] = useState([]);
    const [query, setQuery] = useSearchParams();

    const getProducts = async () => {
        let searchQuery = query.get('q') || '';
        let url = `http://localhost:4004/products?q=${searchQuery}`;
        /* let url = `https://my-json-server.typicode.com/cheeseryon/escape/products?q=${searchQuery}`; */
        let response = await fetch(url);
        let data = await response.json();

        let filteredData = data.filter((item)=> item.title.includes(query.get('q')))

        if((query.get('q'))) {
          setProductList(filteredData);
        } else {
          setProductList(data);
        }
    };
    

    useEffect(() => {
      getProducts();
    }, [query]);

    let areaName = useSelector(state => state.areaName)
    let subAreaName = useSelector(state => state.subAreaName)
    let genreName = useSelector(state => state.genreName)

    const [productFilter , setProductFilter] = useState([]);
    //console.log(query.get('q'))
    console.log(subAreaName)
    //console.log(genreName)
    //console.log(genreName.genreName)

    
    useEffect(() => {
      const filteredArea = prodList.filter((item) => item.area.includes(areaName));
      const filteredSubArea = filteredArea.filter((item) => item.subArea.includes(subAreaName));
      const filteredGenre = filteredSubArea.filter((item) => item.genre.includes(genreName));
    
      console.log(filteredArea)
      let filteredList;
      if (filteredGenre.length > 0) {
        filteredList = filteredGenre;
      } else if (filteredSubArea.length > 0) {
        filteredList = filteredSubArea;
      } else {
        filteredList = filteredArea;
      }
    
      setProductFilter(filteredList);
    }, [areaName , subAreaName, genreName, prodList]);

  return (
    <div className='prodListBox'>
      <div className='topInnerWrap'>
        <div className="inner">
          <AreaList />
          <GenreList />
        </div>
      </div>

      <div className="inner">
        <div className="themeList">
          {
            productFilter.map((menu, idx) => (
              <div className="listWrap" key={idx}>
                <ProductCard item={menu} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default ProductAll;
