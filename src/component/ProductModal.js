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

    /* 하위 컴포넌트인 매장의 다른테마 선택하면 해당 요소의 정보(객체)를 호출 */
    const [theme , setTheme] = useState()
    const postItem = (list) => {
        setTheme(list)
    }
    /* 하위 컴포넌트에서 호출된 정보가 있다면 부모 컴포넌트의 item을 하위 컴포넌트의 item으로 변경 */
    if(theme) {
        item = theme
    }

    /* 모달창에서 좋아요 클릭시 해당 item.id를 store에 저장 */
    let dispatch = useDispatch()
    let modalItemId = item.id
    const likeClick = () => {
        dispatch ({type:"MODAL_LIKE" , payload:''})
        dispatch ({type:"MODAL_ID" , payload:{modalItemId}})
    }

    /* store에 저장된 좋아요 id목록을 호출하고 좋아요 on 시키기 */
    let likeId = useSelector(state => state.likeId)  
    const [modalLike , setModalLike ] = useState()
    useEffect(() => {
        if(likeId.includes(item.id)) {
            setModalLike(true)
        } else {
            setModalLike(false)
        }
    }, [likeId , postItem]);

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
