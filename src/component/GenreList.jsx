import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useSelector } from 'react-redux';

const GenreList = () => {
  const genre = [
      "전체",
      "판타지",
      "공포",
      "잠입",
      "감성",
      "모험",
      '기타'
    ]

  const dispatch = useDispatch();
  const [ genreName , setGenreName ] = useState(genre[0])
  const [ genreTextColor , setGenreTextColor] = useState(0)

  //첫 렌더링시 장르 전체를 보여주기 위함
  useEffect(()=> {
      dispatch({type:"GENRE_SELECT" , payload:{genreName}}) 
  },[dispatch])

  //메인지역(서울,경기) 선택시 장르 필터를 "전체"로 변경 (장르 필터 초기화)
  let mainAreaName = useSelector(state => state.mainAreaName) 
  useEffect(()=> {
    setGenreTextColor(0)
  },[mainAreaName])

  /* 장르 선택시 store에 저장 */
  const genreCheck = (e) => {
    e.preventDefault()
    let targetText = e.target.innerText

    setGenreName(targetText)
    setGenreTextColor(e.target.value)
    dispatch({type:"GENRE_SELECT" , payload:{genreName:targetText}})
  }

  return (
    <div className="genreList">
      <div>장르</div>
      <ul>
        {
          genre.map((list, idx) =>
          <li className={`${genreTextColor == idx ? 'on' : ''}`} onClick={genreCheck} key={idx} value={idx}>
              {list}
          </li>
        )}
      </ul>
    </div>
  )
}

export default GenreList
