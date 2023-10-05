import React , { useState , useEffect }from 'react'
import ProductCard from './ProductCard'

const StoreInfo = ({item , prodList}) => {
    console.log(prodList)

    const [storeTheme , setStoreTheme ] = useState([])
    let fiteredTheme = prodList.filter((theme) => 
        theme.store.includes(item.store) && 
        theme.title !== item.title
    )


    useEffect(() => {
        setStoreTheme(fiteredTheme)
    },[])
    
    

    console.log(storeTheme)

    return (
        <div>
            <div className="storeName">
                <span>{item?.store}</span>
                <span>홈페이지 방문</span>
            </div>
            <div>
                <p>매장의 다른테마</p>
                <ul>
                    {
                        storeTheme.map((menu , idx) => (
                            <ProductCard item={menu} key={idx}/>
                        ))
                    }
                
                </ul>
            </div>
        </div>
    )
}

export default StoreInfo
