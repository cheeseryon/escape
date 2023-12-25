import React , {useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import { auth , signInWithEmailAndPassword } from "../firebase-config";

const Login = () => {
  const navigate = useNavigate();
  const goHome = () => {
      navigate('/')
  }
  const goAccountPage = () => {
    navigate('/account')
  }

  const [inputFocus, setInputFocus ] = useState('');
  const inputFocusOut = () => {
    window.addEventListener('click' , (e) => {
      if(!e.target.closest('input')) {
        setInputFocus('')
      }
    })
  }
  inputFocusOut()

  const [loginEmail,setLoginEmail] =useState("")
  const [loginPw,setLoginPw] =useState("")
  const [errorMsg, setErrorMsg] = useState("");

  const login = async() => {
    if(loginEmail === '') {
      setErrorMsg("이메일을 입력해주세요.")
    } else if((!/\S+@\S+\.\S+/.test(loginEmail))) {
      setErrorMsg("이메일 형식으로 입력해주세요.")
    } else if (loginPw === '') {
      setErrorMsg("비밀번호을 입력해주세요.")
    } else if(loginEmail !== '' && loginPw !== '') {
        const loginUser = await signInWithEmailAndPassword(auth , loginEmail, loginPw)
        .then((userCredential) => {
          const user = userCredential.user;
          setLoginEmail("");
          setLoginPw("");

          navigate('/myPage')
        }) .catch((err) => {
            console.log(err.code)
            setErrorMsg("아이디 또는 비밀번호를 확인해주세요.")
        })
      }
    }
    
  return (
    <div className="loginPage">
      <div className='wrap'>
        <h1 className='logo' onClick={goHome}>또!방탈출</h1>

        <div className='userInfoInput'>
          <div className='idInputArea'>
            <span className='idIcon'></span>    
            <input
              type="email"
              placeholder="아이디" 
              id="1"
              onChange={(e) =>{setLoginEmail(e.target.value)}}  
              onFocus={(e) => {setInputFocus(e.target.id)}}
              className={`${inputFocus == 1 ? 'focusOn' :''}`}
            />
          </div>
          <div className='pwInputArea'>
            <span className='pwIcon'></span>  
            <form>
              <input
                type="password"
                placeholder="비밀번호" 
                id="2"
                onChange={(e) =>{setLoginPw(e.target.value)}}  
                onFocus={(e) => {setInputFocus(e.target.id)}}
                onKeyDown={(e) => {
                  if(e.key === "Enter") {
                    login()
                }}}
                className={`${inputFocus == 2 ? 'focusOn' :''}`}
                />
            </form>
          </div>

          <div className='errorMsg'>
            <p>{errorMsg.length > 0 ? errorMsg : ''}</p>
          </div>
        </div>

        <div className='loginBtnArea'>
            <button type="submit" onClick={login}>로그인</button>
        </div>

        <div className="accountBtnArea">
            <button className="link" onClick={goAccountPage}>회원가입</button>
        </div>
      </div>
    </div>
  )
}

export default Login
