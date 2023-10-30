import React , {useState} from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import likeIcon from '../img/like.png'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();
    const goToMyPage = () => {
        navigate('/myPage')
    }
    
    const [keyword , setKeyword] = useState();
    
    let textInput = (e) => {
      setKeyword(e.target.value)
    }

    let textSearch = (e) => {
      if(e.key === "Enter") {                  
         navigate(`/?q=${keyword}`)         
       } 
    }

    let iconSearch = () => {
      navigate(`/?q=${keyword}`)  
    }

    /* productAll로 이동 */
    let goHome = () => {
      navigate('/')
    } 

    /* 좋아요 갯수 표시 */
    let likeId = useSelector(state => state.likeId)

  return (
    <>
      <div className='head'>
        <div className="inner">
          <div className="logo" onClick={goHome} style={{cursor:'pointer'}}>또!방탈출</div>
            <div className="util">
              <div className='searchArea'>
                <input type="text" className="searchBox" placeholder="테마 검색" onChange={(e)=>textInput(e)} onKeyDown={(e)=>textSearch(e)}/>
                <FontAwesomeIcon icon={faSearch} className='searchIcon' onClick={iconSearch}/>
              </div>
              <div className="likeListPage"  onClick={goToMyPage}>
                <img className='likeIcon' src={likeIcon}></img>
                <span className='iconBg'></span>
                <span>{likeId.length}</span>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar
