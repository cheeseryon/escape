import React , { useState , useEffect }from 'react'
/* import { Navigation, Pagination, Scrollbar } from 'swiper'; */
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard'

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation,Keyboard, } from 'swiper/modules';

const StoreInfo = ({item , prodList , postItem}) => {
    console.log(prodList)
    

    const getItem = (theme) => {
        postItem(theme)
    }
    /* console.log(theme) */
    const [storeTheme , setStoreTheme ] = useState([])
    let fiteredTheme = prodList.filter((theme) => 
        theme.store.includes(item.store) && 
        theme.title !== item.title
    )
    useEffect(() => {
        setStoreTheme(fiteredTheme)
    },[postItem])

    return (
        <div className="storeInfoWrap">
            <div className="storeName">
                <p>{item?.store}</p>
                <p>주소 : </p>
            </div>
            <div className='storeThemeList'>
                       <p>매장의 다른테마</p> 
                <Swiper
                    cssMode={true}
                    navigation={true}
                    keyboard={true}
                    mousewheel={false}
                    modules={[Navigation , Keyboard]}
                    className="mySwiper"
                >
               
                    {
                        storeTheme.map((menu , idx) => (
                            <SwiperSlide className="storeThemeItem"><ProductCard item={menu} key={idx} getItem={getItem}/></SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default StoreInfo
