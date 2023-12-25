import { React, useState, useEffect} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import key from '../img/key.png'
import xIcon from '../img/xIcon.png'
import {firestore} from "../firebase-config"
import {doc, serverTimestamp, runTransaction } from "firebase/firestore";

const ProductCard = ({item, getProdCardData, loginCheck, userId, likeIdList}) => {
  const postParentComponentData = (event) => {
    event.stopPropagation()
    getProdCardData(item);
  };

  const likeClick = async (event) => {
    event.stopPropagation()
    try {
      let cardItemId = item.id
      const likeRef = doc(firestore, userId, 'like', 'likeObj', cardItemId);
  
      await runTransaction(firestore, async (transaction) => {
        const likeDoc = await transaction.get(likeRef);
  
        if (likeDoc.exists()) {
          transaction.delete(likeRef);
        } else {
          transaction.set(likeRef, {
            id: item.id,
            img: item.img,
            title: item.title,
            store: item.store,
            site: item.site,
            genre: item.genre,
            time: item.time,
            area: item.area,
            subArea: item.subArea,
            difficulty: item.difficulty,
            story: item.story,
            timestp: serverTimestamp()
          });
        }
      });
    } catch (error) {
      console.log("좋아요 토글 실패", error);
    }
  };

  const navigator = useNavigate()
  const goToLoginPage = (event) => {
    event.stopPropagation()
    let msg=window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")
    if(msg) {
      navigator("/loginPage")
    }
  }

  return (
    <div className='prodCardWrap'>
      <div
        className={`like ${likeIdList.includes(item.id) ? 'on' : ''}`}
        onClickCapture={(event) => {loginCheck ? likeClick(event) : goToLoginPage(event)}}
      />
      <div className="prodCardItem" onClickCapture={(event) => {postParentComponentData(event)}}>
        <figure>
          <img src={item?.img} alt="" />
        </figure>
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
