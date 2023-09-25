import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css'

const ProductDetail = (item) => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const getProductsDetail = async() => {
    
      let url = `http://localhost:4004/products/${id}`
      let response = await fetch(url);
      let data = await response.json();
      console.log(data)
      setProduct(data)
  }
  useEffect(() => {
    getProductsDetail()
}, [])

  return (
    
    <div>
      <div className='itemInfo'>      
            <div>
                <img className='img' src={process.env.PUBLIC_URL + product?.img} alt={product?.imgAlt} />
            </div>
            <div className='text'>
                <p className='title'>{product?.title}</p>
                <p className='genre'>장르 : {product?.genre}</p>
                <p className='store'>매장 : {product?.store}</p>
                <p className='like'><span></span> {product?.like}</p>
                <p className='info'>테마정보</p>
                <p className='infoText'>{product?.info}</p>
            </div>
        </div>
        {/* <Form.Select>
          <option>인원수 선택</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form.Select>

        <Button variant="dark">예약하기</Button>
        <Button variant="dark">리스트 추가</Button> */}
    </div>


  )
}

export default ProductDetail
