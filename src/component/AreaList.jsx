import { React , useEffect } from 'react'
import '../App.css'
import { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'

const areaList = [
    {
        id: 0,
        mainArea: "서울",
        subArea : [
            "전체",
            "강남",
            "홍대",
            "신촌",
            "건대",
            "기타"
        ]
    },
    {
        id: 1,
        mainArea: "경기",
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

const AreaList = () => {
    const dispatch = useDispatch();
    const [mainAreaOptionToggle , setMainAreaOptionToggle] = useState(false); //

    if(mainAreaOptionToggle) {
        window.addEventListener('click' , (e) => {
            if(!e.target.closest('.areaSelectBox') && mainAreaOptionToggle === true) {
             setMainAreaOptionToggle(false)
             }
        })
    }
    const mainAreaOptionShowHide = () => {
        setMainAreaOptionToggle(!mainAreaOptionToggle); //메인지역(서울,경기) 버튼 클릭시 area 목록 보이기&숨기기 처리
    }
    
    const [mainAreaName, setMainAreaName] = useState(areaList[0].mainArea); //지역:서울 버튼의 기본 값
    const [subAreaName , setSubAreaName] = useState(areaList[0].subArea[0]) // 홈(productAll)에서 지역,장르 필터 기능을 위해 서브지역의 이름을 전달하기 위해 필요 
    const [subAreaList, setSubAreaList] = useState(areaList[0].subArea);
    const [subAreaTextColor , setSubAreaTextColor] = useState(0)

    useEffect(() => {
        dispatch({type:"AREA_SELECT" , payload:{mainAreaName}})
        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName}})
    },[])


    const mainAreaCheck = (e) => {
        let targetId = e.target.id //메인지역(서울,경기) ##선택시 해당 지역의 id
        let filteredArea = areaList.find(item => item.id == targetId); // mainArea 클릭시 해당 요소의 subArea만 필터
        let targetText = e.target.innerText // 메인지역(서울,경기) 선택시 해당 지역명을 추출

        setMainAreaName(targetText) // 메인지역을 선택시 추출된 텍스트로 지역:서울 버튼의 기본 값을 변경 
        setMainAreaOptionToggle(!mainAreaOptionToggle);
        setSubAreaTextColor(0)
        setSubAreaList([...filteredArea.subArea])

        mainAreaDispatch(targetText)
    }
    const mainAreaDispatch = (targetText) => {
        dispatch({type:"AREA_SELECT" , payload:{mainAreaName:targetText}})
        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName:areaList[0].subArea[0]}})
        dispatch({type:"GENRE_SELECT" , payload:{genreName:'전체'}})
    }

    
    const subAreaCheck = (e) => {
        let targetText = e.target.innerText
        setSubAreaName(targetText)
        setSubAreaTextColor(e.target.value)

        subAreaDispatch(targetText)
    }
    let genreName = useSelector(state => state.genreName)
    const subAreaDispatch = (targetText) => {
        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName:targetText}})
        dispatch({type:"GENRE_SELECT" , payload:{genreName:genreName}})
    }

  return (
    <div className="areaSection">
        <div>  
            <div className="areaText">지역</div>
            <div className='areaSelectBox'>                
                <button className={`selectBtn ${mainAreaOptionToggle ? 'on' : ''}`} onClick={mainAreaOptionShowHide}>
                    {mainAreaName}
                </button>
                <ul className={`areaOption ${mainAreaOptionToggle ? '' : 'hide'}`}>
                    {
                        areaList.map((item, idx) => 
                            <li key={idx} id={idx} onClick={mainAreaCheck} >{item.mainArea}</li>
                        )
                    }
                </ul>
            </div>
    
            <ul className="subAreaList">
                {
                    subAreaList.map((list, idx) =>
                        <li key={idx} value={idx} onClick={subAreaCheck} className={`${subAreaTextColor == idx ? 'on' : ''}`}> {list} </li>
                    )
                }
            </ul>
        </div>  
    </div>  
  )
}

export default AreaList
