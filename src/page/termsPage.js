import {React , useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();
  const goHome = () => {
      navigate('/')
  }
  const handleClickTermsButton = () => {
    navigate('/signUpPage')
  }
  const goBack = () => {
    let msg = window.confirm("회원가입을 취소하시겠습니까?")
    if(msg) {
      navigate('/loginPage')
    }
  }

  const [checkedList,setCheckedList] =useState({firstItem:false, secondItem:false})
  const handleOneTermsChecked = () => {
    setCheckedList(prevState => ({...prevState, firstItem:!prevState.firstItem}))
  }
  const handleTwoTermsChecked = (e) => {
    setCheckedList(prevState => ({...prevState, secondItem:!prevState.secondItem}))
  }
  const termsCheckAlert = (e) => {
    e.preventDefault()
    window.alert("약관에 동의해주세요.")
  }

  return (
    <div className="termAndSingPage" id="termsPage">
      <main>
        <div>
          <h1 className='logo' onClick={goHome}>또!방탈출</h1>
        </div>

        <article id="first">
          <div>
            <h2>이용약관 동의</h2>
          </div>

          <ul>
            <li className="termsList">
              <label><input type="checkbox" checked={checkedList.firstItem} onChange={(e) => handleOneTermsChecked(e)}/></label>
              <p>서비스 이용약관 동의<span>(필수)</span></p>
              <span>내용보기</span>
            </li>
            <li className="termsList" >
              <label><input type="checkbox" checked={checkedList.secondItem} onChange={(e) => handleTwoTermsChecked(e)}/></label>
              <p>개인정보 수집 및 이용동의<span>(필수)</span></p>
              <span>내용보기</span>
            </li>
            
          </ul>
        </article>

        <article id="second">
          <form>
            <div className='signUpBtn nextBtn'>
              <button onClick={(e) => (
                checkedList.firstItem === true && checkedList.secondItem === true 
                ? handleClickTermsButton(e)
                : termsCheckAlert(e)
                )}>동의하고 가입하기</button>
            </div>

            <div className="cancelBtn">
                <button onClick={(e) => goBack(e)}>취소</button>
            </div>
          </form>
          <div className="copyright">Copyright 또!방탈출 All Rights Reserved.</div>
        </article>
      </main>
    </div>
  )
}

export default Terms
