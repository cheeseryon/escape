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

    useEffect(()=> {
        dispatch({type:"GENRE_SELECT" , payload:{genreName}}) //첫 렌더링시 장르 전체를 보여주기 위함
    },[dispatch])

    let areaName = useSelector(state => state.areaName) //메인지역(서울,)

    const genreCheck = (e) => {
        e.preventDefault()
        let targetText = e.target.innerText

        setGenreName(targetText)
        setGenreTextColor(e.target.value)
        dispatch({type:"GENRE_SELECT" , payload:{genreName:targetText}})
    }

    useEffect(()=> {
        setGenreTextColor(0)
    },[areaName])

  return (
    <div className="genreList">
      <ul>
        <li>장르</li>
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
