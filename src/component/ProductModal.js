import React , { useState , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux'
import '../App.css'
import key from '../img/key.png'
import star from '../img/star.png'
import xIcon from '../img/xIcon.png'
import storeIcon from '../img/store.png'
import closeIcon from '../img/close.png'
import StoreInfo from './StoreInfo';

const ProductModal = ({item , hideModal}) => {
    const modalClose = () => {
        hideModal(false)
    }

    const [theme , setTheme] =useState()
    const postItem = (list) => {
        setTheme(list)
    }
    if(theme) {
        item = theme
    }

    let dispatch = useDispatch()
    let likeId = useSelector(state => state.likeId)  

    const [modalLike , setModalLike ] = useState()
    useEffect(() => {
        if(likeId.includes(item.id)) {
            setModalLike(true)
        } else {
            setModalLike(false)
        }
    }, [likeId , postItem]);

    let modalItemId = item.id
    const likeClick = () => {
        dispatch ({type:"MODAL_LIKE" , payload:''})
        dispatch ({type:"MODAL_ID" , payload:{modalItemId}})
    }

    return (
        <div className='prodModalWrap'>              
            <div className="modalBg" onClick={modalClose}/>
            <div className="modalDetail">             
                <div className='prodInfo'>  
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
                                    item?.story.split('\n').map((text, index) => (
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
                            
                        </ul>
                        <StoreInfo item={item} postItem={postItem} />
                        {/* <Review />   */}          
                       
                    </section>
                </div>

                <div className='btnArea'>
                    <span className={`like ${modalLike == true ? 'on' : ''}`} onClick={likeClick}><span /></span>
                    <span className='modalCloseBtn' onClick={modalClose}><img src={closeIcon}></img></span>
                </div>
            </div> 
        </div>
    )
}

export default ProductModal
