import React , { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {doc, serverTimestamp, runTransaction } from "firebase/firestore";
import '../App.css'
import key from '../img/key.png'
import xIcon from '../img/xIcon.png'
import closeIcon from '../img/close.png'
import StoreInfo from './StoreInfo';
import CalendarC from './CalendarC';

import {firestore} from "../firebase-config"



const ProductModal = ({item , hideModal, loginCheck, userId, likeIdList, recordedIdList}) => {
    const modalClose = () => {
        hideModal(false)
    }

    /* 하위 컴포넌트인 매장의 다른테마 선택하면 해당 요소의 정보(객체)를 호출 */
    const [theme , setTheme] = useState()
    const getStoreInfoData = (list) => {
        setTheme(list)
    }
    /* 하위 컴포넌트에서 호출된 정보가 있다면 부모 컴포넌트의 item을 하위 컴포넌트의 item으로 변경 */
    if(theme) {
        item = theme
    }
    

    /* 사이트 버튼 기능들 */
    let navigate = useNavigate()
    const goToLoginPage = () => {
        let msg=window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")
        if(msg) {
            navigate("/")
        }
    }

    const goToStoreHomepage = () => {
        window.open(item.site)
    }

    const [calendarOn , setCalendarOff] = useState(false)
    const addSchedule = () => {
        setCalendarOff(!calendarOn)
    }

    const cancelBtn = (state) => {
        setCalendarOff(state)
    }

    const recordedTheme = async() => {
        try {
            let cardItemId = item.id
            const recordedThemeRef = doc(firestore, userId, 'record', 'recordedObj', cardItemId)
            await runTransaction(firestore, async(transaction) => {
                const recordedThemeDoc = await transaction.get(recordedThemeRef)

                if (recordedThemeDoc.exists()) {
                    let deleteConfirmMsg = window.confirm("해당 테마를 기록에서 삭제하시겠습니까?")
                    if(deleteConfirmMsg) {
                        transaction.delete(recordedThemeRef)
                    } 
                }else {
                    let recordedConfirmMsg = window.confirm("해당 테마를 기록하시겠습니까?")
                    if(recordedConfirmMsg) {
                        transaction.set(recordedThemeRef, {
                            id: item.id,
                            img: item.img,
                            title: item.title,
                            store: item.store,
                            site: item.site,
                            genre: item.genre,
                            time: item.time,
                            area: item.area,
                            subArea: item.subArea,
                            difficulty: item.difficulty,
                            story: item.story,
                            timestp: serverTimestamp(),
                            escapeCheck: "",
                            leftTime:"",
                            hint:"",
                            perceivedDifficulty:"",
                            review:""
                        })
                    }
                }
            }) 
        } catch(error) {
            console.log("기록하기 토글 실패",error)
        };
    };

    const likeClick = async () => {
        try {
            let cardItemId = item.id
            const likeThemeRef = doc(firestore, userId, 'like', 'likeObj', cardItemId);
        
            await runTransaction(firestore, async (transaction) => {
                const likeThemeDoc = await transaction.get(likeThemeRef);
        
                if (likeThemeDoc.exists()) {
                    transaction.delete(likeThemeRef);
                } else {
                    transaction.set(likeThemeRef, {
                        id: item.id,
                        img: item.img,
                        title: item.title,
                        store: item.store,
                        site: item.site,
                        genre: item.genre,
                        time: item.time,
                        area: item.area,
                        subArea: item.subArea,
                        difficulty: item.difficulty,
                        story: item.story,
                        timestp: serverTimestamp()
                });
                }
            });
    
            } catch (error) {
            console.log("좋아요 토글 실패", error);
            }
        };

   

    return (
        <section className='modalSection'>              
            <div className="modalBg" onClick={modalClose}/>
            <div className="modalDetail">             
                <div className='prodInfo'>  
                    <h2>상세정보</h2>
                    <article className="firstArticle">                
                        <figure className='imgArea'>
                            <img className='img' src={process.env.PUBLIC_URL + item?.img} alt={item?.imgAlt} />
                        </figure>
                        <div className='textArea'>
                            <p className='title'>{item?.title}</p>
                            <p className='genre'>{item?.genre[0]}</p>
                            <p className='store'>{item?.store}</p>

                            <div className='evaluation'>
                                <p className='difficulty'>
                                    <span className='keyIcon'><img src={key} alt="열쇠" /></span>
                                    <span className='xIcon'><img src={xIcon} alt="" /></span>
                                    <span className='num'><span>{item?.difficulty}</span>  </span>
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
                    </article>

                    <article className='secondArticle'>
                        <ul className='tabArea'>
                            
                        </ul>
                        <StoreInfo item={item}
                            getStoreInfoData={getStoreInfoData}
                            loginCheck={loginCheck}
                            userId={userId}
                            likeIdList={likeIdList}
                        />      
                    </article>
                </div>

                <div className="btnArea">
                    <div id='top'>
                        <div className="storeLink" onClick={goToStoreHomepage}>
                            <span className="imgBox"/>
                            <span className="btnHoverActive">홈페이지</span>
                        </div>

                        <div className={`schedule ${calendarOn ? 'active' : ''}`} onClick={loginCheck ? addSchedule : goToLoginPage}>                        
                            <span className="imgBox"/>
                            <span className="btnHoverActive">일정 등록</span>
                        </div>

                        <div className={`recorded ${recordedIdList.includes(item.id) ? 'on' : ''}`} onClick={loginCheck ? recordedTheme : goToLoginPage}>                        
                            <span className="imgBox"/>
                            <span className="btnHoverActive">기록하기</span>
                        </div>

                        <div className={`like ${likeIdList.includes(item.id) ? 'on' : ''}`} onClick={loginCheck ? likeClick : goToLoginPage}>
                            <span className="imgBox"/>
                            <span className="btnHoverActive">좋아요</span>
                        </div>
                    </div>
                    
                    <div id='bottom'>
                        <div className='modalCloseBtn' onClick={modalClose}><img src={closeIcon}>
                            </img>
                            <span className="btnHoverActive">닫기</span>
                        </div>
                    </div>
                </div>

                {
                    calendarOn
                    ? 
                    <div className="calendarWrap">
                        <div>
                            <h2>일정 등록</h2>
                            <CalendarC cancelBtn={cancelBtn} item={item} userId={userId}/>
                        </div>
                    </div>

                    : '' 
                } 

            </div> 
                       

        </section>
    )
}

export default ProductModal
