import React , {useState,useEffect} from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom'
import myPageIcon from '../img/mypage.png'
import serchIcon from '../img/serchIcon.png'
import { useDispatch } from 'react-redux';
import {signOut , auth} from "../firebase-config"

const Navbar = ({loginCheck , logOutCheck, schedulesList, scheduleItems }) => {
  const navigate = useNavigate();
  let goHome = () => {
    navigate('/')
  } 

  const [keyword , setKeyword] = useState('');
  let textInput = (e) => {
    setKeyword(e.target.value)
  }
  let textSearch = (e) => {
    if(e.key === "Enter") {        
      navigate(`/?q=${keyword}`)  

      if(keyword == '') {
        navigate('/')
      }
    }
  }
  let iconSearch = () => {
    navigate(`/?q=${keyword}`)  
  }


 
  let today = new Date()
  let todayHours = today.getHours()
  const [dDayList , setDDayList] = useState([])

  const dDayCalc = () => {
    let array = [];
    schedulesList.map((time, idx) => {  
      let dDay = new Date(time)
      let leftTime = dDay - today
      let leftDate = Math.floor(leftTime / (1000 * 60 * 60 * 24));
      let leftHours = Math.floor(leftTime / (1000 * 60 * 60));
      let leftHoursCalc = Math.floor(leftHours - leftDate * 24)

      array.push({
        date : leftDate,
        hours : leftHoursCalc
      })
    })
    setDDayList(array)
  }

  useEffect(() => {
    dDayCalc()
  },[schedulesList , todayHours])
  
  console.log(dDayList)
  



  console.log(schedulesList)
  const goToMyPageNotify = () => {
    let msg = window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")
    if(msg) {
      navigate('/loginPage')
    }
  }


  const goToLoginPage = () => {
    let msg = window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")
    if(msg) {
      /* navigate('/loginPage') */
    }
  }

  const dispatch = useDispatch()
  const goToMyPage = (e) => {
    let tabIndex = e.currentTarget.dataset.idx
    dispatch({type:"TABINDEX" , payload:{tabIndex:tabIndex}})
    navigate(`/myPage`)
  }

  const logOut = async () => {
      signOut(auth)
      .then(() => {
        logOutCheck(false)
        alert("로그아웃 되었습니다.")
        navigate("/")
      })
      .catch((console.log("실패_로그아웃")))
  }

  return (
    <>
      <header className='head'>
        <div className="inner">
          <div className="logo" onClick={goHome} style={{cursor:'pointer'}}>또!방탈출</div>
          <div className="util">
            <div className='searchArea'>
              <input type="text" className="searchBox" placeholder="테마 검색" onChange={(e)=>textInput(e)} onKeyDown={(e)=>textSearch(e)} />
              <img className='searchIcon' src={serchIcon} onClick={iconSearch}/>
            </div>

            <div className="notifyListPage">
              <span className={`notifyIcon ${schedulesList.length > 0 ? "on" : ""}`} onClick={loginCheck ? '' : goToLoginPage}>
                <span>{schedulesList.length}</span>
              </span>
              <div className="hoverBox">
                <ul>
                  {
                    dDayList.map((time, timeIdx) => {  
                      return( 
                        scheduleItems.map((item, itemIdx) => {
                          return(
                            <li item={item} key={item.id}>
                              { timeIdx === itemIdx
                                ? `${item.title} 일정까지 ${time.date}일 ${time.hours}시간 남았습니다`
                                : ''
                              }
                            </li>
                          )
                        })  
                      )                      
                    })
                  }
                </ul>
              </div>
            </div>

            <div className="myPage" >
              <img className='myPageIcon' src={myPageIcon} data-idx="0" onClick={(e) => (loginCheck ? goToMyPage(e) : goToLoginPage)}></img>
              <div className="hoverBox">
                <ul>
                  <li onClick={(e) => (loginCheck ? goToMyPage(e) : goToLoginPage)} data-idx="0">좋아요 목록</li>
                  <li onClick={(e) => (loginCheck ? goToMyPage(e) : goToLoginPage)} data-idx="1">기록한 테마</li>
                  <li onClick={loginCheck ? goToMyPage : goToLoginPage}>일정 관리</li>
                  <li onClick={logOut} className={`logOutBtn ${loginCheck ? "on" : ''}`}>로그아웃</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
