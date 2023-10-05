import React , { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux'
import '../App.css'
import key from '../img/key.png'
import star from '../img/star.png'
import xIcon from '../img/xIcon.png'
import storeIcon from '../img/store.png'
import closeIcon from '../img/close.png'
import Review from './Review';
import StoreInfo from './StoreInfo';

const ProductModal = ({item , hideModal , prodList}) => {
    const modalClose = () => {
        hideModal(false)
    }

    let dispatch = useDispatch()
    let cardLike = useSelector(state => state.cardLike)
    let cardItemId = useSelector(state => state.cardItemId)  

    const [modalLike , setModalLike ] = useState(false)

    useEffect(() => {
        if (item.id === cardItemId) {
            setModalLike(cardLike)
        }
    }, [cardLike]);

    let modalItemId = item.id
    const likeClick = () => {
        setModalLike(!modalLike)
        dispatch ({type:"MODAL_LIKE" , payload:{modalLike:!modalLike}})
        dispatch ({type:"MODAL_ID" , payload:{modalItemId}})
    }

    return (
        <div className='itemDetail'>              
            <div className="itemBg" onClick={modalClose}/>
            <div className="itemWrap">             
                <div className='itemInfo'>  
                    <h2>상세정보</h2>
                    <section className="topInfoSec">                
                        <div className='imgArea'>
                            <img className='img' src={process.env.PUBLIC_URL + item?.img} alt={item?.imgAlt} />
                        </div>
                        <div className='textArea'>
                            <p className='title'>{item?.title}</p>
                            <p className='genre'>{item?.genre[0]}</p>
                            <p className='store'>{item?.store}</p>

                            <div className='evaluation'>
                                <p className='difficulty'>
                                    <span className='keyIcon'><img src={key} alt="열쇠" /></span>
                                    <span className='xIcon'><img src={xIcon} alt="" /></span>
                                    <span className='num'>{item?.difficulty}</span>
                                </p>
                                <p className='score'>
                                    <span className='starIcon'><img src={star} alt="별" /></span>
                                    <span className='num'>4.5</span>
                                </p>
                            </div>
                            <div className='themeInfo'>
                                <h4>테마 설명</h4>
                                <p className='themeInfoText'>
                                {
                                    item?.info.split('\n').map((text, index) => (
                                    <React.Fragment key={index}>
                                        {text}
                                        <br />
                                    </React.Fragment>
                                    ))
                                }
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className='bottomInfoSec'>
                        <ul className='tabArea'>
                            <li className='storeInfo'>매장</li>
                            <li className='review'>리뷰</li>
                        </ul>
                        <StoreInfo item={item} prodList={prodList}/>
                        {/* <Review />   */}          
                       
                    </section>
                </div>

                <div className='btnArea'>
                    <span className={`like ${modalLike ? 'on' : ''}`} onClick={likeClick}><span /></span>
                    <span className='storeLink'><img src={storeIcon}></img></span>
                    <span className='modalCloseBtn' onClick={modalClose}><img src={closeIcon}></img></span>
                </div>
            </div> 


             
        </div>
    )
}

export default ProductModal
