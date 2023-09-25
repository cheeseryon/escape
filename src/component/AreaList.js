import React, { useEffect } from 'react'
import '../App.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

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
                "건대",
                "대학로",
                "신림",
                "영등포",
                "잠실"
                /* "기타" */
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
        },
        {
            id: 2,
            name: "인천",
            subArea : [
                "전체"                
            ]
        },
        {
            id: 3,
            name: "충청",
            subArea : [
                "전체",
                "대전",
                "천안",
                "청주",
                "기타"                
            ]
        },
        {
            id: 4,
            name: "경상",
            subArea : [
                "전체",
                "대구",
                "부산",               
                "기타"                
            ]
        },
        {
            id: 5,
            name: "전라",
            subArea : [
                "전체",
                "광주",
                "전주",               
                "기타"                
            ]
        },
        {
            id: 6,
            name: "강원",
            subArea : [
                "전체"                                
            ]

        },
        {
            id: 7,
            name: "제주",
            subArea : [
                "전체"                                
            ]
            
        }
    ]
    const dispatch = useDispatch();

    const [showOption , setShowOption] = useState(false);
    const [areaBorderOn , setAreaBorderOn] = useState(false);
    const toggleBtn = () => {
        setShowOption(!showOption);
        setAreaBorderOn(!areaBorderOn)
    }

 /*    const [subAreaList, setSubAreaList] = useState([]); */
    const [subAreaList, setSubAreaList] = useState(areaList[0].subArea);
    const [btnAreaName, setBtnAreaName] = useState(areaList[0].name);
    const areaCheck = (e) => {
        let idx = e.target.id
        let filteredArea = areaList.find(item => item.id == idx);

        setSubAreaList([...filteredArea.subArea])

        let areaNameText = e.target.innerText
        setBtnAreaName(areaNameText)
        dispatch({type:"AREA_SELECT" , payload:{areaNameText}})
        
        setShowOption(!showOption);
    }

  
    /* const [subAreaName , setSubAreaName] = useState('') */
    const [subAreaTextColor , setSubAreaTextColor] = useState('#777777')

    const subAreaCheck = (e) => {
        e.preventDefault();
        let subAreaName = e.target.innerText

        /* setSubAreaName(subAreaName) */
    
        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName}})
    }

  /*   useEffect(() => {
        dispatch({type:"AREA_SELECT" , payload:{areaName}})
        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName}})
    },[dispatch]) */
    
  return (
    <div className="areaSection">
        <div>  
            <div className='areaSelectBox'>
                <button className={`selectBtn ${areaBorderOn ? '' : 'on'}`} onClick={toggleBtn}>
                    지역 : {btnAreaName}
                </button>
                <ul className={`areaOption ${showOption ? '' : 'hide'}`}>
                    {
                        areaList.map(
                            (item, idx) => <li key={idx}><button onClick={areaCheck} id={idx}>{item.name}</button></li>
                        )
                    }
                </ul>
            </div>
    
            <ul className="subAreaList">
                {
                    subAreaList.map(
                        (list, idx) => <li  onClick={subAreaCheck} key={idx} >{list}</li>
                    )
                }
            </ul>
        </div>  
    </div>  
  )
}

export default AreaList
