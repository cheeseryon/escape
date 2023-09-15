import React from 'react'
import { useNavigate } from 'react-router-dom'
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons' */

const NavBar = () => {
    const menuList = [
        "테마정보",
        "매장정보",
        "고객지원"
    ]

    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login')
    }
    let search = (e) => {
        if(e.key === "Enter") {
            console.log("enter", e.key)
        }
    }

    <return>
        <>
            <h1>또!방탈출</h1>
            <div className='gnb'>
                <ul>
                    {
                        menuList.map(
                            (menu,i) => <li>{menu}</li>
                        )
                    }
                </ul>
            </div>
            <div>
                <div className='searchArea'>
                    <input type="text" onKetDown={(e)=> search(e)}/>검색
                </div>
            {/*   <FontAwesomeIcon icon={faUser}/> */}
                <div className='loginBtn' onclick={goToLogin}>
                    <span className='loginText'>로그인</span>
                </div>
            </div>
        </>
    </return>
}

export default NavBar