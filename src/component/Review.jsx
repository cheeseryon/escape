import React , {useEffect, useState}from 'react'
import grayStarIcon from '../img/star_gray.png'
import starIcon from '../img/star.png'
import {firestore} from "../firebase-config"
import {doc, serverTimestamp, runTransaction } from "firebase/firestore";

const starIconIdx = [1,2,3,4,5,6,7,8,9,10]
const successOrFailure = ["성공","실패"]
const hintUsageOption = ["1","2","3","4","5","6","7","8","9","10"]
const difficulty = ["매우쉬움","쉬움","보통","어려움","매우어려움"]

const Review = ({item,userId,getReviewClose,reviewObJ}) => {
    const [clickedStar,setClickedStar] =useState("")
    const [clickedEscapeCheck,setClickedEscapeCheck] = useState("")
    const [leftMin, setLeftMin] = useState('00')
    const [leftSec, setLeftSec] = useState('00')
    const [selectedHintValue,setSelectedHintValue] = useState("0")
    const [hintOptionBoxShowOrHide,setHintOptionBoxShowOrHide] = useState(false)
    const hintOptionClick = (e) => {
        setSelectedHintValue(e.currentTarget.dataset.idx)
        setHintOptionBoxShowOrHide(false)
    }
    const hintBoxShow = () => {}
    
    if (hintOptionBoxShowOrHide) {
        window.addEventListener("click", handleWindowClick);
    }
    function handleWindowClick(e) {
        if (!e.target.closest(".hintInputArea")) {
            setHintOptionBoxShowOrHide(false);
            window.removeEventListener("click", handleWindowClick);
        }
    }

    const [clickedDifficulty,setClickedDifficulty] = useState("")
    const [reviewText,setReviewText] = useState("")
    const textareaChange = (e) => {
        setReviewText(e.target.value)
    }
    
    const onCilckReviewUpdate = async() => {        
        try {
            let cardItemId = item.id
            const reviewThemeRef = doc(firestore, userId, 'review', 'reviewObj', cardItemId)
            await runTransaction(firestore, async(transaction) => {
                const reviewThemeDoc = await transaction.get(reviewThemeRef)

                transaction.set(reviewThemeRef, {
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
                    timestp: serverTimestamp(),
                    rating: clickedStar,
                    escapeCheck: clickedEscapeCheck,
                    leftMin: leftMin,
                    leftSec: leftSec,
                    hint:selectedHintValue,
                    perceivedDifficulty:clickedDifficulty,
                    text:reviewText
                })

                if(reviewThemeDoc.exists()) {
                    window.alert("후기를 수정했습니다.")
                }  else {
                    window.alert("후기가 작성되었습니다.")
                }
            }) 
        } catch(error) {
            console.log("")
        };
    }

    const [modifyChange , setModifyChange] = useState({inputElem : false, btn : false})

    const reviewModifyActive = () => {
        let modifyMsg = window.confirm("후기를 수정하시겠습니까?")
        if(modifyMsg) {
            setModifyChange(prevState => ({ ...prevState, inputElem: true }));
        }
    }

    useEffect(() => {
        let filtered = reviewObJ.filter((obj,idx) => obj.id === item.id)
        if(filtered.length > 0) {
            setModifyChange(prevState => ({ ...prevState, btn:true }))
            setClickedStar(filtered[0].rating)
            setClickedEscapeCheck(filtered[0].escapeCheck)
            setLeftMin(filtered[0].leftMin)
            setLeftSec(filtered[0].leftSec)
            setSelectedHintValue(filtered[0].hint)
            setClickedDifficulty(filtered[0].perceivedDifficulty)
            setReviewText(filtered[0].text)
        }
    },[reviewObJ,userId,item.id])

    const reviewClose = () => {
        let msg = window.confirm("현재 창을 닫으시겠습니까?")
        if(msg) getReviewClose(false)
    }

  return (
    <div className="reviewWrap">                 
        <article id="firstBox">            
            <div>
                {
                    starIconIdx.map((menu,idx) => (
                        <span className="starWrapBox">   
                            <img
                                menu={menu}
                                key={idx}
                                data-idx={idx + 1}
                                onClick={(e) => setClickedStar(e.currentTarget.dataset.idx)}
                                className="starIcon"
                                src={`${clickedStar > idx ? starIcon : grayStarIcon }`}
                            />
                        </span> 
                    ))
                }                        
            </div>      
            <div id="rating"> 
                <span> 
                    <span>{clickedStar}</span>/ 10점
                </span>
            </div>               
        </article>

        <article id="secondBox">
            <div>
                <div id="escapeCheckArea">
                    <h4>탈출 여부</h4>
                    <div>
                        {
                            successOrFailure.map((menu,idx) => (
                                <span
                                    menu={menu}
                                    key={idx}
                                    data-idx={idx}
                                    onClick={(e) => setClickedEscapeCheck(e.currentTarget.dataset.idx)}
                                    className={`selectedElem ${clickedEscapeCheck === String(idx) ? "on" : ""}`}
                                >
                                    {menu}
                                </span>
                            ))
                        }                        
                    </div>
                </div>
                
                <div id="leftTimeArea">
                    <h4>남은 시간</h4>
                    <div className="inputArea">
                        <input type="num" value={leftMin || ""} onChange={(e) => setLeftMin(e.target.value)}/>
                        <>:</>
                        <input type="num" value={leftSec || ""} onChange={(e) => setLeftSec(e.target.value)}/>
                    </div>
                </div>

                <div id="hint">
                    <h4>힌트 횟수</h4>
                    <div className="hintInputArea">
                        <input type="number" value={selectedHintValue || ""} onChange={(e) =>setSelectedHintValue(e.target.value)} onFocus={hintBoxShow}/>
                        <ul className={`hintOption ${hintOptionBoxShowOrHide ? "on" : ""}`}>
                        {
                            hintUsageOption.map((option,idx) => (
                                <li
                                    option={option}
                                    key={idx}
                                    data-idx={idx + 1}
                                    onClick={(e) => hintOptionClick(e)}
                                >
                                    {option}
                                </li>
                            ))
                        }
                        </ul>
                    </div>                
                </div>
            </div>
            
        </article>

        <article id="thirdBox">
            <div id="difficulty">
                <h4>체감 난이도</h4>
                <div>
                    {
                        difficulty.map((menu,idx) => (
                            <span
                                menu={menu}
                                key={idx}
                                data-idx={idx}
                                onClick={(e) => setClickedDifficulty(e.currentTarget.dataset.idx)}
                                className={`selectedOption ${clickedDifficulty === String(idx) ? "on" : ""}`}
                            >
                                {menu}
                            </span>
                        ))
                    }
                </div>
            </div>
        </article>

        <article id="forthBox">
            <div>
                <h4>내용</h4>
                <div className="reviewMemo">
                    <textarea type="text-area" spellcheck="false" placeholder='내용을 입력해주세요.' value={reviewText || ""} onChange={(e) => textareaChange(e)}/>
                </div>
            </div>
        </article>

        <div className="bottomBtnArea">
            <div>
                {
                    modifyChange.btn
                    ? <span onClick={modifyChange.inputElem ? onCilckReviewUpdate : reviewModifyActive}>수정</span>
                    : <span onClick={onCilckReviewUpdate}>저장</span>
                }
                
                <span onClick={reviewClose}>닫기</span>
            </div>
        </div>

        {
            modifyChange.btn === true && modifyChange.inputElem === false ? <div className="inputPrevent"/> : ""
        }

    </div>
    )
}

export default Review
