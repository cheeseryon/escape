import React,{useEffect,useState}from 'react'
import Navbar from '../component/Navbar'
import ProductCard from '../component/ProductCard'
import ProductModal from '../component/ProductModal'
import RecordedThemeCard from '../component/RecordedThemeCard'
import Calendar from '../component/CalendarC'
import Footer from '../component/Footer'
import calendarListRemoveBtn from '../img/xIcon.png'

import {firestore , auth, onAuthStateChanged } from "../firebase-config"
import { doc, collection, getDocs, deleteDoc} from 'firebase/firestore';
import { useSelector } from 'react-redux'

const MyPage = ({likeIdList , uid, reviewIdList, reviewObJ, schedulesList, scheduleItems, scheduleId}) => {
  const user = auth.currentUser
  let userId;
  if(user) {
    userId = user.uid
  }

  /* 로그인 확인 */
  const [loginCheck , setLoginCheck] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    user ? setLoginCheck(true) : setLoginCheck(false)
    });
  }, [])

/* 로그아웃 확인 */
  const logOutCheck =(check)=> {
    setLoginCheck(check)
  }

  /* 탭메뉴 */
  let tabIndex = useSelector(state => state.tabIndex)  
  const [tabMenu,setTabMenu] = useState(["일정 관리","좋아요 목록","기록한 테마"])
  const [tabMenuIdx,setTabMenuIdx] = useState("0")
  const tabClick = (e) => {
    setTabMenuIdx(e.currentTarget.dataset.index)
  }
  useEffect(() => {
    setTabMenuIdx(String(tabIndex))
  }, [tabIndex])


  /* 서버에 있는 좋아요 목록 get */
  const [likeList , setLikeList] = useState([])
  const likeListGet = async () => {
    try {
      const query = await getDocs(collection(firestore, userId, "like", "likeObj" )); 
      let likeArr = [];
      query.forEach((doc) =>  {
        likeArr.push(doc.data())
      });
      setLikeList(likeArr)
    } catch (error) {
      /* console.log("MyPage Firebase likeList Get Error") */
    }
  } 
  /* 좋아요 목록 변경시 get 업데이트   */
  useEffect(() => {
    likeListGet()
  },[likeIdList, uid])

  
  /* 선택한 날짜 가져오기 */
  const [selectedDate,setSelectedDate] = useState('')
  const getScheduleByDate = (item) => {
    setSelectedDate(item)
  }
 

  /* 선택한 일자에 맞는 스케줄 찾아서 렌더링하기 */
  const [dateSchedule , setDateSchedule] = useState([])
  const selectedDateScheduleRendering = () => {
    let filtered = scheduleItems.filter((item) => item.date === selectedDate)
    setDateSchedule(filtered)
  };

  useEffect(() => {
    selectedDateScheduleRendering()
  }, [selectedDate , scheduleItems]);

  /* 스케쥴 삭제 */
  const selectedScheduleRemove = async (e) => {
    let target = e.target.dataset.id
    try {
      let msg = window.confirm("해당 일정을 삭제하시겠습니까?")
      if(msg) {
          await deleteDoc(doc(firestore, userId, "schedule", "list", target))
          let filtered = dateSchedule.filter((item) => item.id !== target)
          setDateSchedule(filtered)
      }
    } catch(error) {
        /* console.log("스케쥴 삭제 실패") */
    }
  }



   /* 모달 열고 닫기 */
  const [showModal , setShowModal ] = useState(false)
  const [modalItem, setModalItem] = useState(null);
  const hideModal = (state) => {
    setShowModal(state)
  }
  const getProdCardData = (item) => {
    setModalItem(item);
    setShowModal(!showModal)
  }

  const scheduleListModalOpen = (e) => {
    let target = e.currentTarget.dataset.item
    setModalItem(JSON.parse(target))
    setShowModal(!showModal)
  }

  return (
    <div className="myPage">
      <Navbar loginCheck={loginCheck} logOutCheck={logOutCheck} schedulesList={schedulesList} scheduleItems={scheduleItems}/>
      <div className="topInnerWrap" id="myPageTopInner">
        <div className="inner">
          {
            tabMenu.map((item,idx) => (
              <span className={`tabMenu ${tabMenuIdx.includes(idx) ? "on" : ""}`} key={idx} data-index={idx} onClick={(e) => tabClick(e)}>{item}</span>
            ))
          }
        </div>
      </div>
    
      <main style={{minHeight:window.innerHeight - 80 + "px"}}>
        <div className="inner">
          <div className= {`firstTabMenu ${tabMenuIdx === "1" ? "on" : ""}`}>
            <ul className="itemlistBox" >
              {
                likeList.map((item , idx) =>
                  <li className="itemWrap">
                    <ProductCard
                      item={item}
                      key={idx}
                      index={idx}
                      onClick={getProdCardData}
                      getProdCardData={getProdCardData}
                      loginCheck={loginCheck}
                      userId={ user ? userId : ""}
                      likeIdList={likeIdList}
                    />
                  </li>
                )
              }
            </ul>
          </div>
            
          <div className={`secondTabMenu ${tabMenuIdx === "2" ? "on" : ""}`}>
            <ul className="itemlistBox" >
              {
                reviewObJ.map((item , idx) =>
                  <li className="itemWrap">
                    <RecordedThemeCard
                      item={item}
                      key={idx}
                      index={idx}
                      onClick={getProdCardData}
                      getProdCardData={getProdCardData}
                      loginCheck={loginCheck}
                      userId={ user ? userId : ""}
                      likeIdList={likeIdList}
                    />
                  </li>
                )
              }
            </ul>
          </div>

          <div className={`thirdTabMenu ${tabMenuIdx === "0" ? "on" : ""}`}>
            <article> 
              <section className="listArea">
                <h3>{selectedDate} 일정</h3>
                <ul>
                  { 
                    dateSchedule.length > 0 
                    ? dateSchedule.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0)).map((item,idx) => {
                      return (
                        <li item={item} key={idx} className="list">
                          <p data-item={JSON.stringify(item)} onClick={(e) => scheduleListModalOpen(e)}>
                            <span>{item.startTime}</span>
                            <span>{item.title}</span>  
                            <span>{item.store}</span>         
                          </p>          
                          <img src={calendarListRemoveBtn} data-id={item.id} onClick={(e) => selectedScheduleRemove(e)}></img>
                        </li>
                      )
                    })
                    : <li className="noScheduleMessage">해당 날짜의 일정이 없습니다.</li>
                  }
                </ul>
              </section>

              <section className="calArea">
                <h3>달력</h3>
                <Calendar getScheduleByDate={getScheduleByDate} scheduleItems={scheduleItems}/>
              </section>
            </article>
          </div>

          {
            showModal
            ? <ProductModal             
              item={modalItem}
              hideModal={hideModal}
              loginCheck={loginCheck}
              userId={ user ? userId : ''}
              likeIdList={likeIdList}
              reviewIdList={reviewIdList}
              reviewObJ={reviewObJ}
              scheduleItems={scheduleItems}
              schedulesList={schedulesList}
              scheduleId={scheduleId}
            /> 
            : ""
            }
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MyPage
