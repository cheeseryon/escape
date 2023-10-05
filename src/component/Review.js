import React , { useState } from 'react'
import star from '../img/star.png'
import starGray from '../img/star_gray.png'

const Review = () => {

    const [clicked, setClicked] = useState([false,false,false,false,false]);
    const array = [0,1,2,3,4]
    const starClick = () => {

    }
  return (
    <div>
       <div className='reviewArea'>
                            <div className="reviewTop">
                                <p>4.5 (264)</p>                             
                                <ul class="starArea">
                                    {
                                    array.map((item,idx)=> (
                                        <li key={idx}
                                            onClick={() => starClick(idx)}
                                            className={clicked[idx] && 'black'}>
                                            <img src={starGray} alt="별" />
                                        </li>
                                    ))
                                    }
                                </ul>    
                            </div>

                            <div className="reviewBottom">
                                <ul>
                                    <li className='reviewItem'>
                                        <div className="userName">
                                            <span>메로나</span>
                                            <div className='evaluation'>
                                                <p className='score'>
                                                    <span className='starIcon'>
                                                        <img src={star} alt="별" />
                                                        <img src={star} alt="별" />
                                                        <img src={star} alt="별" />
                                                        <img src={star} alt="별" />
                                                        <img src={starGray} alt="별" />
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="date">2023-10-06</div>
                                        </div>

                                        <div className="userThemeInfo">
                                            <p className='successWhether'>탈출 | 성공</p>
                                            <p className="leftTime">남은시간 | 4:56 </p>
                                        </div>                                                
                                        <div className="reviewText">
                                            정말 재밌어요! 약간 노후화된 부분도 있지만 전체적으로 장르에 잘 맞는 인테리어와 스토리로 몰입이 잘 되고, 문제들도 너무 어렵지 않아서 무난하게 탈출 했어요!
                                        </div>
                                        <div className=""></div>                                       
                                    </li>
                                </ul>
                            </div>

                            <div className='reviewInput'>

                            </div>
                        </div>
    </div>
  )
}

export default Review
