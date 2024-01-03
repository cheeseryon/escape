import React , {useState , useEffect} from 'react'
import alignShowIcon from '../img/alignShowIcon.png'
import alignHideIcon from '../img/alignHideIcon.png'


const Alignment = ({themeDb , dataAlignment}) => {
  const [themeAligntBtn , setThemeAligntBtn] = useState(1)

  /* 테마명 오름차순 정렬 */
  const themeAscending = (e) => {
    let dataAlign = [...themeDb]
    dataAlign.sort(function (a, b) {
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    })
    dataAlignment(dataAlign)
    setThemeAligntBtn(e.target.id)
  }

  /* 테마명 내림차순 정렬 */
  const themeDescending = (e) => {
    let dataAlign = [...themeDb]
    dataAlign.sort((a, b) => {
      return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
    })
    dataAlignment(dataAlign)
    setThemeAligntBtn(e.target.id)
  }

  /* 필터 아이콘 클릭시 아이콘 변경 */
  const [align , setAlign] = useState();
  const alignToggle = () => {
    setAlign(!align)
  }

  /* 난이도(key 모양) 클릭시 해당 난이도의 테마를 추가 및 제거 */
  const [keyValue, setKeyValue] = useState(["매우쉬움","쉬움","보통","어려움","매우어려움"])
  const [selectedKey , setSelectedKey] = useState([])

  const keyCheck = (e) => {
    let targetId = e.target.closest('span').id
    if(selectedKey.length == 0) {
      setSelectedKey([...selectedKey, targetId])

    } else {
      let idAddRemove = selectedKey.includes(targetId)
      ?  selectedKey.filter((item)=> item !== targetId)
      : [...selectedKey, targetId]
      setSelectedKey(idAddRemove)
    }
  }

  /*
    난이도가 선택되면 해당 난이도에 맞는 테마만 filter 후 부모에게 전달하고,
    난이도가 선택되지 않는 경우 부모 컴포넌트에게 기존의 데이터베이스를 전달
  */
  useEffect(() => {
    if(selectedKey.length === 0) {
      dataAlignment([...themeDb])
    } else {
      let dataAlign = [...themeDb]
      let filteredDifficulty = dataAlign.filter((item) => selectedKey.includes(item.difficulty))

      dataAlignment(filteredDifficulty)
    }
  },[selectedKey])

  return (
    <div className='ailgnArea'>
      <ul className={`alignList ${align ? 'on' : ''}`}  >
        <li className="themeName">
          <div>
            <h3>테마명</h3>
            <p>
              <span onClick={themeAscending} id='1' className={`selectedOption ${themeAligntBtn == "1" ? 'on' : '' }`}>오름차순</span>
              <span onClick={themeDescending} id='2' className={`selectedOption ${themeAligntBtn == "2" ? 'on' : '' }`}>내림차순</span>   
            </p>
          </div>
        </li>
       
        <li className="difficultyCheck">
          <div>
            <h3>난이도</h3>
            <p>
              {
                keyValue.map((menu , idx) => (
                  <span key={idx} onClick={keyCheck} id={idx + 1} className={`selectedOption ${selectedKey.includes(String(idx + 1)) ? 'on' : ''}`}>
                    <>{menu}</>
                  </span>
                ))
              }        
            </p>
          </div>  
        </li>
        
      </ul>

      <div className="alignBtn" onClick={alignToggle}>
        <img src={align ? alignHideIcon : alignShowIcon} alt="" />
      </div>
    </div>
  )
}

export default Alignment
