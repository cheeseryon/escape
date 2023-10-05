import { React , useEffect } from 'react'
import '../App.css'
import { useDispatch , useSelector , } from 'react-redux'
import { useState } from 'react'
import key from '../img/key.png'
import star from '../img/star.png'
import xIcon from '../img/xIcon.png'


const ProductCard = ({item , getItem}) => {
  const postItem = () => {
    getItem(item);
  };
  let dispatch = useDispatch()
  let modalLike = useSelector(state => state.modalLike)
  let modalItemId = useSelector(state => state.modalItemId)

  const [cardLike , setCardLike] = useState(false)
  useEffect (() => {
    if(item.id == modalItemId) {
      setCardLike(modalLike)
    }
  }, [modalLike])
 
  let cardItemId = item.id
  const likeClick = () => {
    setCardLike(!cardLike)
    dispatch ({type:"CARD_LIKE" , payload:{cardLike:!cardLike}})
    dispatch ({type:"CARD_ID" , payload:{cardItemId}})
  }
  
  return (
    <div className='prodCardWrap'>
      <div className={`like ${cardLike ? 'on' : ''}`} onClick={likeClick}/>
      <div className="prodCardItem" onClick={postItem}>
        <div className="imgBox">
          <img src={item?.img} alt="" />
        </div>
        <div className='text'>
          <div className="title">{item?.title}</div>
          <div className="genre">{item?.genre[0]}</div>
          <div className="store">{item?.store}</div>
          <div className='evaluation'>
            <p className='difficulty'>
              <span className='keyIcon'><img src={key} alt="열쇠" /></span>
              <span className='xIcon'><img src={xIcon} alt="" /></span>
              <span className='num'>{item.difficulty}</span>
              </p>
            <p className='score'>
              <span className='starIcon'><img src={star} alt="별" /></span>
              <span className='num'>4.5</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
