import { React , useEffect } from 'react'
import '../App.css'
import { useDispatch , useSelector , } from 'react-redux'
import { useState } from 'react'
import key from '../img/key.png'
import xIcon from '../img/xIcon.png'

const ProductCard = ({item , getItem}) => {

  /* 해당 카드가 가진 item(객체)의 정보를 부모 요소로 전달하기 위한 함수 */
  const postItem = () => {
    getItem(item);
  };

  /* 좋아요 클릭시 해당 카드의 item.id값을 store에 저장 */
  let dispatch = useDispatch()
  const likeClick = () => {
    dispatch ({type:"CARD_LIKE" , payload:''})
    dispatch ({type:"CARD_ID" , payload:{cardItemId}})
  }

  /* 좋아요 클릭으로 store에 저장된 item.id값을 불러온 뒤, 해당 카드의 item.id가 있다면 좋아요 이미지를 변경 */
  let likeId = useSelector(state => state.likeId)
  let cardItemId = item.id
  const [cardLike , setCardLike] = useState()
  useEffect (() => {
    if(likeId.includes(item.id)) {
      setCardLike(true)
    } else {
      setCardLike(false)
    }
  }, [likeId , postItem])

  return (
    <div className='prodCardWrap'>
      <div className={`like ${cardLike == true ? 'on' : ''}`} onClick={likeClick}/>
      <div className="prodCardItem" onClick={postItem}>
        <div className="imgBox">
          <img src={item?.img} alt="" />
        </div>
        <div className='text'>
          <div className="title"><span>테마 :</span>{item.title}</div>
          <div className="genre"><span>장르 :</span>{item.genre[0]}</div>
          <div className="store"><span>매장 :</span>{item.store}</div>
          <div className='evaluation'>
            <p className='difficulty'>
              <span className='keyIcon'><img src={key} alt="열쇠" /></span>
              <span className='xIcon'><img src={xIcon} alt="" /></span>
              <span className='num'>{item.difficulty}</span>
            </p>
          </div>
        </div>
       
        <div className="detailShowText">상세보기</div>
      </div>
    </div>
  )
}

export default ProductCard
