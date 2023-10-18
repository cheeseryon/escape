import React from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import likeIcon from '../img/like.png'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();
    const goToMyPage = () => {
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

    let likeId = useSelector(state => state.likeId)

  return (
    <>
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
            <div className="likeListPage"  onClick={goToMyPage}>
              <img className='likeIcon' src={likeIcon}></img>
              <span className='iconBg'></span>
              <span>{likeId.length}</span>
            </div>
            <div className="myPage">
              <FontAwesomeIcon icon={faUser} className='userIcon' onClick={goToMyPage}/>
            </div>
          </div>
          </div>
        </div>
    </>
  )
}

export default Navbar
