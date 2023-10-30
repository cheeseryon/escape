import React, { useEffect, useState } from 'react';
import '../App.css'
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';
import GenreList from '../component/GenreList';
import AreaList from '../component/AreaList'
import { useSelector } from 'react-redux';
import Navbar from '../component/Navbar';
import ProductModal from '../component/ProductModal';
import dataBase from '../db/db.json'
import Alignment from '../component/Alignment';

const ProductAll = () => {
  const [prodList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const [data , setData] = useState(dataBase.products)

  const dataAlignment = (data) => {
    setData(data)
  }
  const getProducts = async () => {
    if((query.get('q'))) {
      let filteredData = data.filter((item)=> item.title.toLowerCase().includes(query.get('q').toLowerCase()))
      setProductList(filteredData);
    } else {
      setProductList(data);
    }
  };

  console.log(query.get('q'))

    useEffect(() => {
      getProducts();
    }, [query , data]);

    /* 지역,장르 필터 */
    let areaName = useSelector(state => state.areaName)
    let subAreaName = useSelector(state => state.subAreaName)
    let genreName = useSelector(state => state.genreName)
    const [filteredProduct , setfilteredProduct] = useState([]);
    const filteredArea = prodList.filter((item) => item.area.includes(areaName));
    const filteredGenre = filteredArea.filter((item) => 
      item.subArea.includes(subAreaName) && item.genre.includes(genreName)
    );
    useEffect(() => {
      setfilteredProduct(filteredGenre);
    }, [areaName , subAreaName, genreName, prodList]);

    
    const [showModal , setShowModal ] = useState(false)
    const [modalItem, setModalItem] = useState(null);
    const hideModal = (item) => {
      setShowModal(item)
    }

    /* 자식 컴포넌트에서 모달창 닫기버튼과  */
    const getItem = (item) => {
      setModalItem(item);
      setShowModal(!showModal)
    };

    /* 모달창이 마운트시 배경요소가 스크롤되는 것을 방지 */
    if(showModal == true) {
      document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

  return (
    <div className='productAllPage'>
      <Navbar />
      <div className="topInnerWrap">
        <div className="inner">           
          <AreaList />
          <GenreList />
          
        </div>
        <Alignment dataBase={dataBase.products} dataAlignment={dataAlignment}/>
      </div>

      <div className="inner">
        <div className="themeList">
          {
            filteredGenre.length > 0 ? 
              filteredProduct.map((menu, fpIdx) => (
                <div className="listWrap">
                  <ProductCard item={menu} key={fpIdx} index={fpIdx} onClick={getItem} getItem={getItem} />
                </div>
              )) 
            : <p className='failedMassage'>해당 조건의 테마가 없습니다</p>
          }
        </div>
      </div>
          {
            showModal? <ProductModal item={modalItem} hideModal={hideModal}/> : null
          }
    </div>
  );
}

export default ProductAll;
