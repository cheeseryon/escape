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
                "건대",
                "기타"
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

    const [areaBtnToggle , setAreaBtnToggle] = useState(false); //
    window.addEventListener('click' , (e) => {
        if(!e.target.closest('.areaSelectBox') && areaBtnToggle === true) {
         setAreaBtnToggle(false)
         }
    })
    const toggleBtn = () => {
        setAreaBtnToggle(!areaBtnToggle); //메인지역(서울,경기) 버튼 클릭시 area 목록 보이기&숨기기 처리
    }

    const dispatch = useDispatch();
    const [areaName, setAreaName] = useState(areaList[0].name); //지역:서울 버튼의 기본 값
    const [subAreaName , setSubAreaName] = useState(areaList[0].subArea[0]) // 홈(productAll)에서 지역,장르 필터 기능을 위해 서브지역의 이름을 전달하기 위해 필요 
    const [subAreaList, setSubAreaList] = useState(areaList[0].subArea); //이 컴포넌트에서 맵핑할 테마 목록
    const [subAreaTextColor , setSubAreaTextColor] = useState(0) //메인지역(서울,경기) 변경시 or 서브지역(홍대,강남..)클릭시 서브지역 text color 변경 

    useEffect(() => {
        dispatch({type:"AREA_SELECT" , payload:{areaName}}) //첫 렌더링시 서울의 전체지역으로 테마(product)를 보여주기 위해 필요
        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName}})
    },[])

    const areaCheck = (e) => {
        let targetId = e.target.id //메인지역(서울,경기) ##선택시 해당 지역의 id##
        let filteredArea = areaList.find(item => item.id == targetId); // 모든 지역명을 가지고 있는 객체에서 바로 위 targetId로 원하는 지역 객체만 필터

        let targetText = e.target.innerText // 메인지역(서울,경기) 선택시 해당 지역명을 추출
        setAreaName(targetText) // 메인지역을 선택시 추출된 텍스트로 지역:서울 버튼의 기본 값을 변경 

        setAreaBtnToggle(!areaBtnToggle);
        setSubAreaTextColor(0)
        setSubAreaList([...filteredArea.subArea])
        
        dispatch({type:"AREA_SELECT" , payload:{areaName:targetText}}) //메인지역(서울,경기)가 변경됐을 때 홈화면(productAll)에서 해당 지역의 테마만 필터링하기 위함
        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName:areaList[0].subArea[0]}}) //메인지역(서울,경기)가 변경됐을 때 서브지역(홍대,강남..) 선택을 초기화
        dispatch({type:"GENRE_SELECT" , payload:{genreName:'전체'}}) //메인지역(서울,경기)가 변경됐을 때 장르 선택을 초기화
    }

    let genreName = useSelector(state => state.genreName)

    const subAreaCheck = (e) => {
        e.preventDefault();
        let targetText = e.target.innerText //서브지역(홍대,강남..) 선택시 서브지역명 추출
        setSubAreaName(targetText) //
        setSubAreaTextColor(e.target.value)

        dispatch({type:"SUBAREA_SELECT" , payload:{subAreaName:targetText}}) // 홈(productAll)에서 서브지역 필터를 위해 필요
        dispatch({type:"GENRE_SELECT" , payload:{genreName:genreName}}) // 왜 만들었는지 기억이 안남
    }

  return (
    <div className="areaSection">
        <div>  
            <div className='areaSelectBox'>
                <button className={`selectBtn ${areaBtnToggle ? 'on' : ''}`} onClick={toggleBtn}>
                    지역 : {areaName}
                </button>
                <ul className={`areaOption ${areaBtnToggle ? '' : 'hide'}`}>
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
