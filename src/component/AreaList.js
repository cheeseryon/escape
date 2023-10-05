import { React , useEffect } from 'react'
import '../App.css'
import { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'

const AreaList = () => {
    const areaList = [
        {
            id: 0,
            name: "서울",
            subArea : [
                "전체",
                "강남",
                "홍대",
                "신촌",
                "건대"
            ]
        },
        {
            id: 1,
            name: "경기",
            subArea : [
                "전체",
                "부천",
                "일산",
                "수원",
                "안양",               
                "기타"
            ]
        }
    ]

    const dispatch = useDispatch();

    const [showOption , setShowOption] = useState(false);
    const [areaBorderOn , setAreaBorderOn] = useState(false);
    const toggleBtn = () => {
        setShowOption(!showOption);
        setAreaBorderOn(!areaBorderOn);
    }

    const [areaName, setAreaName] = useState(areaList[0].name);
    const [subAreaName , setSubAreaName] = useState(areaList[0].subArea[0])
    const [subAreaList, setSubAreaList] = useState(areaList[0].subArea);
    const [subAreaTextColor , setSubAreaTextColor] = useState(0)

    useEffect(() => {
        dispatch({type:"AREA_SELECT" , payload:{areaName}})
        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName}})
    },[])

    const areaCheck = (e) => {
        let targetId = e.target.id
        let filteredArea = areaList.find(item => item.id == targetId);

        let targetText = e.target.innerText
        setAreaName(targetText)

        setShowOption(!showOption);
        setAreaBorderOn(!areaBorderOn)
        setSubAreaTextColor(0)
        setSubAreaList([...filteredArea.subArea])
        

        dispatch({type:"AREA_SELECT" , payload:{areaName:targetText}})
        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName:areaList[0].subArea[0]}})
        dispatch({type:"GENRE_SELECT" , payload:{genreName:'전체'}})
    }

    let genreName = useSelector(state => state.genreName)

    const subAreaCheck = (e) => {
        e.preventDefault();
        let targetText = e.target.innerText
        setSubAreaName(targetText)
        setSubAreaTextColor(e.target.value)

        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName:targetText}})
        dispatch({type:"GENRE_SELECT" , payload:{genreName:genreName}})
    }

    /* console.log(genreName) */

  return (
    <div className="areaSection">
        <div>  
            <div className='areaSelectBox'>
                <button className={`selectBtn ${areaBorderOn ? 'on' : ''}`} onClick={toggleBtn}>
                    지역 : {areaName}
                </button>
                <ul className={`areaOption ${showOption ? '' : 'hide'}`}>
                    {
                        areaList.map(
                            (item, idx) => <li key={idx} onClick={areaCheck} id={idx}>{item.name}</li>
                        )
                    }
                </ul>
            </div>
    
            <ul className="subAreaList">
                {
                    subAreaList.map((list, idx) =>
                        <li className={`${subAreaTextColor == idx ? 'on' : ''}`} onClick={subAreaCheck} key={idx} value={idx}> {list} </li>
                    )
                }
            </ul>
        </div>  
    </div>  
  )
}

export default AreaList
