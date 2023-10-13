import React , {useState , useEffect} from 'react'
import alignShowIcon from '../img/alignShowIcon.png'
import alignHideIcon from '../img/alignHideIcon.png'
import keyOff from '../img/keyOff.png'
import keyOn from '../img/keyOn.png'
import xIcon from '../img/xIcon.png'
import xIconOn from '../img/xIconOn.png'

const Alignment = ({dataBase , dataAlignment}) => {
  const [themeAligntBtn , setThemeAligntBtn] = useState(1)

  const themeAscending = (e) => {
      let dataAlign = [...dataBase]
      dataAlign.sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
      })
      dataAlignment(dataAlign)
      setThemeAligntBtn(e.target.id)
    }

    const themeDescending = (e) => {
      let dataAlign = [...dataBase]
      dataAlign.sort((a, b) => {
        return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
      })
      dataAlignment(dataAlign)
      setThemeAligntBtn(e.target.id)
    }

    const [align , setAlign] = useState();
    const alignToggle = () => {
      setAlign(!align)
    }

  const keyValue = [1,2,3,4,5]
  const [keyColor , setKeyColor] = useState([])
  const [selectedKey , setSelectedKey] = useState([])

  const keyCheck = (e) => {
    let targetId = e.target.closest('span').id
    if(selectedKey.length == 0) {
      setSelectedKey([...selectedKey, targetId])
      setKeyColor([...keyColor, targetId])
    } else {
      let idAddRemove = selectedKey.includes(targetId)
      ?  selectedKey.filter((item)=> item !== targetId)
      : [...selectedKey, targetId]
      setSelectedKey(idAddRemove)

      let colorAddRemove = keyColor.includes(targetId)
      ? keyColor.filter((item) => item !== targetId)
      : [...keyColor, targetId]
      setKeyColor(colorAddRemove)
    }
  }

  useEffect(() => {
    if(selectedKey.length == 0) {
      dataAlignment([...dataBase])
    } else {
    let dataAlign = [...dataBase]
      let filteredDifficulty = dataAlign.filter((item) => selectedKey.includes(item.difficulty))

      dataAlignment(filteredDifficulty)
    }
  },[selectedKey])

/*   console.log(keyColor) */

  return (
    <div className='ailgnArea'>
      <ul className={`alignList ${align ? 'on' : ''}`}  >
        <li className="themeName">
          <div>
            <h3>테마명</h3>
            <p>
              <span onClick={themeAscending} id='1' className={`${themeAligntBtn == "1" ? 'on' : '' }`}>오름차순</span>
              <span onClick={themeDescending} id='2' className={`${themeAligntBtn == "2" ? 'on' : '' }`}>내림차순</span>   
            </p>
          </div>
        </li>
       
        <li className="difficultyCheck">
          <div>
            <h3>난이도</h3>
            <p>
              {
                keyValue.map((menu , idx) => (
                  <span key={idx} onClick={keyCheck} id={menu} className={`${keyColor.includes(String(idx + 1)) ? 'on' : ''}`}>
                    <img src={`${keyColor.includes(String(idx + 1)) ? keyOn : keyOff}`} alt="" />
                    <img src={`${keyColor.includes(String(idx + 1)) ? xIconOn : xIcon}`} alt="" />
                    <>{idx + 1}</>
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
