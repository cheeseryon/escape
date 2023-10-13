import { React , useEffect } from 'react'
import '../App.css'
import { useDispatch , useSelector , } from 'react-redux'
import { useState } from 'react'
import key from '../img/key.png'
import star from '../img/star.png'
import xIcon from '../img/xIcon.png'


const ProductCard = ({item , getItem , index}) => {
  const postItem = () => {
    getItem(item);
  };

  let dispatch = useDispatch()
  let likeId = useSelector(state => state.likeId)

  const likeClick = () => {
    dispatch ({type:"CARD_LIKE" , payload:''})
    dispatch ({type:"CARD_ID" , payload:{cardItemId}})
  }

  const [cardLike , setCardLike] = useState()
  let cardItemId = item.id
  useEffect (() => {
    if(likeId.includes(item.id)) {
      setCardLike(true)
    } else {
      setCardLike(false)
    }
  }, [likeId , postItem])
 

 
 /*  console.log(likeToggle) */
 /*  console.log(likeId) */
 

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
           {/*  <p className='score'>
              <span className='starIcon'><img src={star} alt="별" /></span>
              <span className='num'>4.5</span>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
