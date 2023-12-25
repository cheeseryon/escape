import React , {useEffect , useState}from 'react'
import Navbar from '../component/Navbar'
import ProductCard from '../component/ProductCard'
import ProductModal from '../component/ProductModal'
import RecordedTheme from '../component/RecordedTheme'
import Calendar from '../component/CalendarC'

import {firestore , auth, onAuthStateChanged } from "../firebase-config"
import { collection,getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux'




const MyPage = ({likeIdList , uid, recordedIdList}) => {
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
  const [tabMenu,setTabMenu] = useState(["좋아요 목록","기록한 테마","일정 관리"])
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
      console.log("MyPage Firebase likeList Get Error")
    }
  } 

  /* 좋아요 목록 변경시 get 업데이트   */
  useEffect(() => {
    likeListGet()
  },[likeIdList, uid])

  

  const [recordList , setRecordList] = useState([])
  const recordedListGET = async () => {
    try {
      const query = await getDocs(collection(firestore, userId, "record", "recordedObj" )); 
      let recordArr = [];
      query.forEach((doc) =>  {
        recordArr.push(doc.data())
      });
      setRecordList(recordArr)
    } catch (error) {
      console.log("MyPage Firebase record Get Error")
    }
  } 
  useEffect(() => {
    recordedListGET()
  },[recordList, uid])
  


  /* 모달 열고 닫기 */
  const [showModal , setShowModal ] = useState(false)
  const [modalItem, setModalItem] = useState(null);
  const hideModal = (item) => {
    setShowModal(item)
  }
 const getProdCardData = (item) => {
  setModalItem(item);
  setShowModal(!showModal)
}

  return (
    <div className="myPage">
      <Navbar loginCheck={loginCheck} logOutCheck={logOutCheck}/>
      <div className="wrap">
        <div className="myPageHead">
          <div className="inner">
            {
              tabMenu.map((item,idx) => (
                <span className={`tabMenu ${tabMenuIdx.includes(idx) ? "on" : ""}`} key={idx} data-index={idx} onClick={(e) => tabClick(e)}>{item}</span>
              ))
            }
          </div>
        </div>

        <div className="myPageCont">
          <div className="inner">
            <div className= {`firstTabMenu ${tabMenuIdx === "0" ? "on" : ""}`}>
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
              
              {
              showModal
              ? <ProductModal             
                item={modalItem}
                hideModal={hideModal}
                loginCheck={loginCheck}
                userId={ user ? userId : ''}
                likeIdList={likeIdList}
                recordedIdList={recordedIdList}
              /> 
              : null
              }
            </div>
              
            <div className={`secondTabMenu ${tabMenuIdx === "1" ? "on" : ""}`}>
              <ul className="itemlistBox">
                {
                  recordList.map((item,idx) => 
                    <li className="itemWrap">
                      <RecordedTheme 
                        item={item}
                        key={idx}
                      />
                    </li>
                  )
                }
              </ul>
            </div>

            <div className={`secondTabMenu ${tabMenuIdx === "2" ? "on" : ""}`}>
              <div className="calArea">
                <Calendar />
              </div>
              <div className="listArea">

              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default MyPage
