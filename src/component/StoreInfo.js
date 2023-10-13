import React , { useState , useEffect , useRef , useCallback }from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Keyboard, } from 'swiper/modules';
import ProductCard from './ProductCard'
import Map from './Map'
import dataBase from '../db/db.json'

import 'swiper/css';
import 'swiper/css/navigation';

const StoreInfo = ({item , postItem}) => {
    const getItem = (theme) => {
        postItem(theme)
    }
    const [storeTheme , setStoreTheme ] = useState([])
    let fiteredTheme = dataBase.products.filter((theme) => 
        theme.store.includes(item.store) && 
        theme.title !== item.title
    )
    useEffect(() => {
        setStoreTheme(fiteredTheme)
    },[postItem])

    return (
        <div className="storeInfoWrap">
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
                        storeTheme.map((menu , sIdx) => (
                            <SwiperSlide className="storeThemeItem"><ProductCard item={menu} key={sIdx} getItem={getItem}/></SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            {/* <Map item={item}/> */}
        </div>
    )
}

export default StoreInfo
