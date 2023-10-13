import React , {useEffect , useState}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import dataBase from '../db/db.json'
import Navbar from '../component/Navbar'
import key from '../img/key.png'
import xIcon from '../img/xIcon.png'

const MyPage = () => {

  let likeId = useSelector(state => state.likeId)  
  let data = dataBase.products

 const [likeList , setLikeList] = useState([])

  useEffect(() => {
    let filteredData = data.filter((dataObj) => likeId.includes(dataObj.id))
    setLikeList(filteredData)
  }, [likeId])

  /* console.log(likeList) */

  let dispatch = useDispatch()
  const themeRemove = (e) => {
    let removeId = Number(e.target.id)
    dispatch({type:"LIKE_ID_REMOVE" , payload:{removeId}})
    console.log(removeId)
    console.log(likeList)
  }


  return (
    <div className="myPage">
      <Navbar />
      <div className="wrap">
        <div className="myPageHead">
          <div className="inner">
            <span className="on">좋아요 목록</span>
          </div>
        </div>

        <div className="myPageCont">
            <div className="inner">
              <ul className="likeList">
                  {
                    likeList.map((menu , idx) =>
                      <li key={idx} className="likeTheme">
                        <div className="imgBox">
                            <img src={menu.img} alt="테마 포스터" />
                        </div>

                        <div className="info">
                          <div className="title"><span>테마 :</span>{menu.title}</div>
                          <div className="genre"><span>장르 :</span>{menu.genre[0]}</div>
                          <div className="store"><span>매장 :</span>{menu.store}</div>
                          <div className='evaluation'>
                            <p className='difficulty'>
                              <span className='keyIcon'><img src={key} alt="열쇠" /></span>
                              <span className='xIcon'><img src={xIcon} alt="" /></span>
                              <span className='num'>{menu.difficulty}</span>
                            </p>
                          </div>
                        </div>  
                       
                        <div className="link">
                          <span>사이트<br />바로가기</span>
                        </div>

                        <span className="removeBtn">
                          <img src={xIcon} alt="" onClick={themeRemove} id={menu.id}/>
                        </span>              
                      </li>
                    )
                  }
              </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage
