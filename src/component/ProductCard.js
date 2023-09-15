import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({item}) => {
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/product/${item?.id}`)
  }
  return (
    <div className='product-list' onClick={showDetail}>
        <div className="product-img"><img src={item?.img} alt="" /></div>
        <div className="title">{item?.title}</div>
        <div className="genre">{item?.genre}</div>
        <div className="store">{item?.store}</div>
    </div>
  )
}

export default ProductCard
