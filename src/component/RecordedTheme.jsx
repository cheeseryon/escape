import React from 'react'
import ProductCard from './ProductCard'
import key from '../img/key.png'
import xIcon from '../img/xIcon.png'

const RecordedTheme = ( {item} ) => {

  return (
    <div className="recordedTheme">
      <article id="first">
        <figure className="imgBox">
          <img src={item.img} alt="" />
        </figure>

        <div id="themeInfo" className="textArea">
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
      </article>

      <article id="second">
        <div className="textArea">
          <div id="escapeCheck">
            <h4>탈출 여부</h4>
            <div>
              <span>성공</span>
              <span>실패</span>
            </div>
          </div>
          
          <div id="leftTime">
            <h4>남은 시간</h4>
            <div>
              <input type="num" name="min" id="" />
              <input type="text" name="sec" id="" />
            </div>
          </div>
        </div>
      </article>

      <article id="third">
        <div className="textArea">
          <div id="score">
            <h4>평점</h4>
            <div>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          <div id="difficulty">
            <h4>난이도</h4>
            <div>
              <span>매우 쉬움</span>
              <span>쉬움</span>
              <span>보통</span>
              <span>어려움</span>
              <span>매우 어려움</span>
            </div>
          </div>
        </div>
      </article>

      <article id="fourth">
        <div className="textArea">
          <h4>후기</h4>
          <input type="text" />
        </div>
      </article>

      <article id="fifth">
        <div id="savaBtn">
          저장
        </div>
        <div id="deleteBtn">
          삭제
        </div>
      </article>
    </div>
  )
}

export default RecordedTheme
