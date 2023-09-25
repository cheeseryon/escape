import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const GenreList = () => {
    const genre = [
        "전체",
        "판타지",
        "공포",
        "잠입",
        "감성",
        "추리",
        "모험",
        "문제",
        "야외",
        "코믹",
        "기타"
      ]

/*     const [genreName , setGenreName] = useState('') */
    const dispatch = useDispatch();
    const genreCheck = (e) => {
        e.preventDefault()
        let genreName =e.target.innerText
        

        dispatch({type:"GENRE_SELECT" , payload:{genreName}})
    }

    /* useEffect(()=> {
        console.log(genreName)
    }) */

  return (
    <div className="genreList">

            <ul>
                {
                    genre.map(
                        (list, idx) => <li  onClick={genreCheck} key={idx} >{list}</li>
                    )
                }
            </ul>

    </div>
  )
}

export default GenreList
