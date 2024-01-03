import React , {useState , useEffect}from 'react'
import ProductCard from './ProductCard'
import Map from './Map'
import themeDb from '../db/db.json'

const StoreInfo = ({item , getStoreInfoData, loginCheck, userId, likeIdList}) => {

    /* 부모 컴포넌트에서 받아온 item을 이용하여 같은 매장의 다른 테마가 있는지 확인 후 "매장내 다른테마" 목록에 추가 */
    const [storeTheme , setStoreTheme ] = useState([])
    let filteredTheme = themeDb.theme.filter((theme) => 
        theme.store.includes(item.store) && 
        theme.title !== item.title
    )

    /* 하위 컴포넌트인 "매장내 다른테마" 클릭시 해당 정보를 받아오고, 다시 부모 컴포넌트인 모달창에 보내기 */
    const getProdCardData = (item) => {
        getStoreInfoData(item)
    }

    /* 하위 컴포넌트인 "매장내 다른테마"의 정보가 모달창으로 전달되었을 때 "매장내 다른테마"의 목록을 변경 */
    useEffect(() => {
        setStoreTheme(filteredTheme)
    },[getStoreInfoData])

    return (
        <div className="storeInfoWrap">   
            {storeTheme.length > 0         
            ? <div className='storeThemeList'>
            <h3>매장의 다른테마</h3>   
                <ul className="differentTheme">    
                    {
                        storeTheme.map((menu , sIdx) => (
                            <li>
                                <ProductCard
                                    item={menu} key={sIdx}
                                    getProdCardData={getProdCardData}
                                    loginCheck={loginCheck}
                                    userId={userId}
                                    likeIdList={likeIdList}
                                />
                            </li>
                        ))
                    }          
                </ul>    
            </div>
            : ''
            }
            <Map item={item}/>
        </div>
    )
}

export default StoreInfo
