import {React ,useState} from 'react'
import grayStarIcon from '../img/star_gray.png'
import starIcon from '../img/star.png'
import '../App.css'

const starIconIdx = [1,2,3,4,5,6,7,8,9,10]

const RecordedThemeCard = ({item, getProdCardData, loginCheck, userId, likeIdList}) => {
  const postParentComponentData = (e) => {
    e.stopPropagation()
    getProdCardData(item);
  };

  const [escapeCheckText ,setEscapeCheckText] = useState(["성공","실패"])
  const [difficultyText ,setDifficultyText] = useState(["매우쉬움","쉬움","보통","어려움","매우어려움"])
  

  return (
    <div className='prodCardWrap' id="reviewCard">
        <div className="recordIcon" />
        <div className="prodCardItem" onClickCapture={(e) => {postParentComponentData(e)}}>
            <figure>
                <img src={item?.img} alt="" />
            </figure>
            <div className='text'>
                <div className="title"><span>테마 :</span>{item.title}</div>
                <div className="store"><span>매장 :</span>{item.store}</div>                
                <div className="escapeCheck">
                  <span>탈출 :</span> {escapeCheckText[item.escapeCheck] || "미입력"}                
                </div>
                <div className="hint">
                  <span>힌트 :</span> {item.hint != "0" ? item.hint : "미입력"}
                </div>
                <div className="leftTime">
                    <span>남은시간 :</span> 
                    {item.leftMin !== "00" && item.leftHour !== "00" ? `${item.leftMin}분${item.leftSec}초 남음` : "미입력" }
                </div>                
                <div className="perceivedDifficulty"><span>체감난이도 :</span>{difficultyText[item.perceivedDifficulty] || "미입력"}</div>
                <div className="rating">
                  <span>평점</span>
                  <div>
                    {
                      starIconIdx.map((menu,idx) => (
                            <span className="starWrapBox">   
                                <img
                                    menu={menu}
                                    key={menu}
                                    data-idx={idx + 1}
                                    className="starIcon"
                                    src={`${item.rating > idx ? starIcon : grayStarIcon }`}
                                />
                            </span> 
                        ))
                      }
                    </div>
                </div>
            </div>  
        </div>
    </div>
  )
}

export default RecordedThemeCard
