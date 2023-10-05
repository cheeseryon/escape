import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css'
import Navbar from '../component/Navbar';
import key from '../img/key.png'
import star from '../img/star.png'
import starGray from '../img/star_gray.png'
import xIcon from '../img/xIcon.png'

const ProductDetail = (item) => {
  const [product, setProduct] = useState(null);
  const {id} = useParams();
  const getProductsDetail = async() => {
      let url = `http://localhost:4004/${id}`
      let response = await fetch(url);
      let data = await response.json();
     /*  console.log(data) */
      setProduct(data)
  }
  
  const [clicked, setClicked] = useState([false,false,false,false,false,false,false,false,false,false]);
  const array = [0,1,2,3,4,5,6,7,8,9]
  const starClick = () => {

  }

  useEffect(() => {
    getProductsDetail()
}, [])

  return (
    <div className='itemInfo'>  
      <Navbar />
      <div className="infoWrap">
        <section className="topInfoSec">
          <div className='imgArea'>
              <img className='img' src={process.env.PUBLIC_URL + product?.img} alt={product?.imgAlt} />
          </div>
          <div className='textArea'>
            <p className='title'>{product?.title}</p>
            <p className='genre'>{product?.genre[0]}</p>
            <p className='store'>{product?.store}</p>

            <div className='Evaluation'>
              <p className='difficulty'>
                <span className='keyIcon'><img src={key} alt="열쇠" /></span>
                <span className='xIcon'><img src={xIcon} alt="" /></span>
                <span className='num'>{product?.difficulty}</span>
              </p>
              <p className='grade'>
                <span className='starIcon'><img src={star} alt="별" /></span>
                <span className='num'>4.5</span>
              </p>
            </div>
            <div className='themeInfo'>
              <h4>테마 설명</h4>
              <p className='themeInfoText'>
                {product?.info.split('\n').map((text, index) => (
                  <React.Fragment key={index}>
                    {text}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </section>

        <section className='bottomInner'>
          <ul className='tabArea'>
            <li className='review'>
              리뷰
            </li>
          </ul>
          <div className='caution'>
            <p>스포일러나 근거없는 비방글은 삭제됩니다</p>
          </div>
          <div className='Evaluation'>
            <div className="scoreCheck">
            {/* {
              array.map((item,idx)=> (
               <div key={idx}
                onClick={() => starClick(idx)}
                className={clicked[idx] && 'black'}>
                  span<img src={starGray} alt="별" />
                </div>
              ))
            } */}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductDetail
