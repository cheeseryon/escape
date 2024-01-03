import { React, useState, useEffect} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import {firestore} from "../firebase-config"
import {doc, serverTimestamp, runTransaction } from "firebase/firestore";

const ProductCard = ({item, getProdCardData, loginCheck, userId, likeIdList}) => {
  const postParentComponentData = (e) => {
    e.stopPropagation()
    getProdCardData(item);
  };

  const likeClick = async (e) => {
    e.stopPropagation()
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
      console.log("");
    }
  };

  const navigator = useNavigate()
  const goToLoginPage = (e) => {
    e.stopPropagation()
    let msg=window.confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")
    if(msg) {
      navigator("/loginPage")
    }
  }

  const [storeDifficulty, setStoreDifficulty] = useState(["매우쉬움","쉬움","보통","어려움","매우어려움"])

  return (
    <div className='prodCardWrap'>
      <div
        className={`like ${likeIdList.includes(item.id) ? 'on' : ''}`}
        onClickCapture={(e) => {loginCheck ? likeClick(e) : goToLoginPage(e)}}
      />
      <div className="prodCardItem" onClickCapture={(e) => {postParentComponentData(e)}}>
        <figure>
          <img src={item?.img} alt="" />
        </figure>
        <div className='text'>
          <div className="title"><span>테마 :</span>{item.title}</div>
          <div className="genre"><span>장르 :</span>{item.genre[0]}</div>
          <div className="store"><span>매장 :</span>{item.store}</div>
          <div className='evaluation'><span>난이도 :</span> {storeDifficulty[item.difficulty - 1]}</div>
        </div>
       
        <div className="detailShowText">상세보기</div>
      </div>
    </div>
  )
}

export default ProductCard
