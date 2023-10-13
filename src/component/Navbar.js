import React from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({authenticate, setAuthenticate}, props) => {
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/myPage')
    }

    let search = (e) => {
        if(e.key === "Enter") {            
            let keyword = e.target.value;            
            navigate(`/?q=${keyword}`)           
        }
    }

    let goHome = () => {
      navigate('/')
    } 
          

  return (
    <>
     {/*  <div className='sideMenu' style={{width:width}}>
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
        } */}

      <div className='head'>
        <div className="inner">
          <div className="logo" onClick={goHome} style={{cursor:'pointer'}}>또!방탈출</div>

          <div className="gnb">
            <ul className="gnbList">          
              <li onClick={goHome}>테마정보</li>
              <li>매장정보</li>
            </ul>
          </div>   

          <div className="util">
            <div className='searchArea'>
              <input type="text" className="searchBox" placeholder="테마 검색" onKeyDown={(e)=> search(e)}/>
              <FontAwesomeIcon icon={faSearch} className='searchIcon'/>
            </div>
            <div className="myPage">
              <FontAwesomeIcon icon={faUser} className='userIcon' onClick={goToLogin}/>
            </div>
          </div>
          </div>
        </div>
    </>
  )
}

export default Navbar
