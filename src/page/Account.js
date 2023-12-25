import React , { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth , createUserWithEmailAndPassword } from "../firebase-config";

const Account = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordCheck, setRegisterPasswordCheck] = useState("");
  const [emailFaild, setEmailFaild] = useState(false);
  const [pwFaild, setPwFaild] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const register = async () => {
    let koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if(registerEmail === '') {
      setEmailFaild(true)
      setErrorMsg('이메일을 입력해주세요.');
      return
    }

    if(koreanRegex.test(registerEmail)) {
      setEmailFaild(true)
      setErrorMsg('이메일 형식을 확인해주세요.');
      return
    } 
      
    if(registerPassword === '' || registerPassword.length < 7) {
      setPwFaild(true)
      setErrorMsg('숫자 8자리 이상으로 만들어주세요.');
      return
    }

    if (registerPassword !== registerPasswordCheck) {
      setPwFaild(true)
      setErrorMsg('비밀번호가 일치하지 않습니다');
      return
    }

    if(
      registerEmail !== '' &&
      registerPassword === registerPasswordCheck &&
      registerPassword.length > 6
      ){
        try {
          setErrorMsg('');
          const createdUser = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
          /* console.log(createdUser); */
          setRegisterEmail("");
          setRegisterPassword("");
          if(window.confirm("회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.")) {
            navigate('/loginPage')
          }
        } catch(err){
          //console.log(err.code);
          switch (err.code) {          
            case 'auth/invalid-email':
              setEmailFaild(true)
              setErrorMsg('이메일 형식을 확인해주세요.');
              break;
            case 'auth/email-already-in-use':
              setEmailFaild(true)
              setErrorMsg('이미 가입되어 있는 계정입니다.');
              break;
          }
        }
      }  
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

  const navigate = useNavigate();
  const goHome = () => {
      navigate('/')
  }
  const goBack = () => {
    let msg = window.confirm("회원가입을 취소하시겠습니까?")
    if(msg) {
      navigate('/loginPage')
    }
  }

  return (
    <div className='accountCreatePage'>
      <div className='wrap'>
        <h1 className='logo' onClick={goHome}>또!방탈출</h1>

        <div className='userInfoInput'>
          <div className='idInputArea'>  
            <span className='idIcon'></span>            
            <input
              type="email"
              placeholder="escape@naver.com"
              id="1"
              onChange={(e) =>{setRegisterEmail(e.target.value)}}   
              onFocus={(e) => {setEmailFaild(false); setInputFocus(e.target.id)}}
              className={`${emailFaild ? 'on' : ""} ${inputFocus == 1 ? 'focusOn' :''}`}
            />
          </div>

          <div className='pwInputArea'>
            <span className='pwIcon'></span>  
            <form>
              <input 
                type="password"
                placeholder="숫자 8자리 이상"
                id="2"
                onChange={(e) => {setRegisterPassword(e.target.value)}}
                onFocus={(e) => {setPwFaild(false); setInputFocus(e.target.id)}}
                className={`${pwFaild ? 'on' : ""} ${inputFocus == 2 ? 'focusOn' :''}`}
              />
            </form> 
          </div>

          <div className='pwCheckInputArea'>
            <span className='pwCheckIcon'></span> 
            <form>
              <input
                type="password"
                id="3"
                placeholder="비밀번호 재확인"                  
                onChange={(e) => {setRegisterPasswordCheck(e.target.value)}}
                onFocus={(e) => {setPwFaild(false); setInputFocus(e.target.id)}}
                className={`${pwFaild ? 'on' : ""} ${inputFocus == 3 ? 'focusOn' :''}`}
              />
            </form>  
          </div>

          <div className='errorMsg'>
            <p>{errorMsg.length > 0 ? errorMsg : ''}</p>
          </div>
        </div>

        <div className='signUpBtn'>
            <button type="submit" onClick={register}>가입하기</button>
        </div>

        <div className="backBtnArea">
            <button onClick={goBack}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default Account
