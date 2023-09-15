import React from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';



const Navbar = ({authenticate, setAuthenticate}) => {
  /* 네비게이션 메뉴바 영역을 배열로 처리 -> 메뉴의 확장성 */
  const menuList = [
    "테마정보",
    "매장정보",
    "고객지원"   
  ]

  let [width, setWidth] = useState();


    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login')
    }
    let search = (e) => {
        if(e.key === "Enter") {            
            let keyword = e.target.value;

            navigate(`/?q=${keyword}`)
            console.log(keyword)
        }
    }
    

  return (
    <>
    {/* 사이드메뉴 */}
      <div className='sideMenu' style={{width:width}}>
        <button className='closeBtn' onClick={()=>setWidth(0)}>
          <img src={require('../img/close.png')} alt="" />
        </button>
        <ul className="sideMenuList">
          {
            menuList.map(
              (menu, idx) => (
              <li key={idx}><a href="#">{menu}</a></li>
            ))
          }
        </ul>
      </div>
    {/* 햄버거메뉴 */}
        <div className="navHeader">
          <div className="burgerMenu hide">
            <img src={require("../img/menu.png")} alt="메뉴열기" onClick={()=>setWidth(280)}/>
          </div>
        </div>

        {
          authenticate ? (
            <div onClick={()=>setAuthenticate(false)}>
              <span style={{cursor:'pointer'}}>로그아웃</span>
            </div>
          ) : (
            <div onClick={()=>navigate('/login')}>
              <span style={{cursor:'pointer'}}>로그인</span>
            </div>
          )
        }
          

            
          
        


      <div className='head'>
        <div className="logo">또!방탈출</div>

        <div className="gnb">
          <ul className="gnbList">
            {
              menuList.map(
                (menu, idx) => <li key={idx}><a href="#">{menu}</a></li>
              )
            }
          </ul>
        </div>   

        <div className="util">
        <div className='searchArea'>
                      <input type="text" placeholder="테마/매장 검색" onKeyDown={(e)=> search(e)}/>검색
                  </div>
          {/* <div className="login-button">
            <span className="login-text">로그인</span>
          </div> */}
        </div>

        </div>
    </>
  )
}

export default Navbar
