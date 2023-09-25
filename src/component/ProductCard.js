import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/product/${item?.id}`)
  }

  const [like , setLike] = useState(false)
  const likeClick = () => {
    setLike(!like)
  }

  return (
    <div className='themeItem'>
      <div className={`like ${like ? 'on' : ''}`} onClick={likeClick} />
      <div className="itemWrap" onClick={showDetail}>
        <div className="imgBox">
          <img src={item?.img} alt="" />
        </div>
        <div className='text'>
          <div className="title">{item?.title}</div>
          <div className="genre">{item?.genre[0]}</div>
          <div className="store">{item?.store}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
