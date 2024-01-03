import {React,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {firestore} from "../firebase-config"
import {doc,serverTimestamp,runTransaction} from "firebase/firestore";
import '../App.css'
import closeIcon from '../img/close.png'
import StoreInfo from './StoreInfo';
import CalendarC from './CalendarC';
import Review from './Review';

const ProductModal = ({item, hideModal, loginCheck, userId, likeIdList, reviewIdList, reviewObJ, scheduleItems, schedulesList, scheduleId}) => {
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
    
    const [storeDifficulty, setStoreDifficulty] = useState(["매우쉬움","쉬움","보통","어려움","매우어려움"])

    /* 사이트 버튼 기능 */
    let navigate = useNavigate()
    const goToLoginPage = () => {
        let msg=window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")
        if(msg) {
            navigate("/loginPage")
        }
    }
    const goToHomepage = () => {window.open(item.site)}
    const [calendarOnOff , setCalendarOnOff] = useState(false)
    const addSchedule = () => {
        setCalendarOnOff(!calendarOnOff)
        setReviewOnOff(false)
    }
    const calendarCloseBtn = (state) => {setCalendarOnOff(state)}

    const [reviewOnOff,setReviewOnOff] = useState(false)
    const recordClick = () => {
        setReviewOnOff(!reviewOnOff)
        setCalendarOnOff(false)
    }
    
    const getReviewClose = (state) => {setReviewOnOff(state)}

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
                console.log("");
            }
    };

    const getScheduleByDate = () => {
        /* 빈값 */
    }

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
                            <p className='title'><span>테마 :</span>{item.title}</p>
                            <p className='genre'><span>장르 :</span>{item.genre[0]}</p>
                            <p className='store'><span>매장 :</span>{item.store}</p>
                            <div className='evaluation'>                            
                                {
                                    storeDifficulty.map((menu,idx) => (                                        
                                        <span menu={menu} key={idx} className={`selectedOption ${Number(item.difficulty) === idx + 1 ? "on" :""}`}>{menu}</span>
                                    ))
                                }
                            </div>
                            <div className='themeInfo'>
                                <h4>테마 설명</h4>
                                <p className='themeInfoText'>
                                {
                                    item.story.split('\n').map((text, index) => (
                                    <span key={index}>
                                        {text}
                                        <br />
                                    </span>
                                    ))
                                }
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className='secondArticle'>
                        <ul className='tabArea'>                            
                            <li className="tabMenu">매장정보</li>
                        </ul>
                        <div className="tabItem">
                            <StoreInfo
                                item={item}
                                getStoreInfoData={getStoreInfoData}
                                loginCheck={loginCheck}
                                userId={userId}
                                likeIdList={likeIdList}                            
                            /> 
                        </div>
                    </article>
                </div>

                <div className="sideBtnArea">
                    <div id='top'>
                        <div className="storeLink" onClick={goToHomepage}>
                            <span className="imgBox"/>
                            <span className="btnHoverActive">홈페이지</span>
                        </div>

                        <div className={`schedule ${calendarOnOff ? 'active' : ''} ${scheduleId.includes(item.id) ? 'on' : ''}`} onClick={loginCheck ? addSchedule : goToLoginPage}>                        
                            <span className="imgBox"/>
                            <span className="btnHoverActive">일정 등록</span>
                        </div>

                        <div className={`review ${reviewOnOff ? 'active' : ''} ${reviewIdList.includes(item.id) ? 'on' : ''}`} onClick={loginCheck ? recordClick : goToLoginPage}>                        
                            <span className="imgBox" />
                            <span className="btnHoverActive">후기 기록</span>
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
                    calendarOnOff
                    ? <div className="modalChangeComp" id="calendarComp">
                        <div>
                            <h2>일정 등록</h2>
                            <CalendarC cancelBtn={calendarCloseBtn} item={item} userId={userId} getScheduleByDate={getScheduleByDate} scheduleItems={scheduleItems}/>
                        </div>
                    </div>
                    : '' 
                } 

                {
                    reviewOnOff
                    ? <div className="modalChangeComp" id="reviewComp">
                        <div>
                            <h2>후기 기록하기</h2>
                            <Review item={item} userId={userId} getReviewClose={getReviewClose} reviewObJ={reviewObJ}/>
                        </div>
                    </div>
                    :""
                }

            </div> 
                       

        </section>
    )
}

export default ProductModal
