import React,{ useEffect,useState,useRef,useCallback} from 'react';
import '../App.css'
import {useSelector} from 'react-redux';
import {useSearchParams,useNavigate} from 'react-router-dom';
import ProductCard from '../component/ProductCard';
import GenreList from '../component/GenreList';
import AreaList from '../component/AreaList'
import Navbar from '../component/Navbar';
import ProductModal from '../component/ProductModal';
import Alignment from '../component/Alignment';
import Footer from '../component/Footer';
import themeDb from '../db/db.json'
import {auth, onAuthStateChanged ,} from "../firebase-config"

const ProductAll = ({likeIdList,appLogoutCheck,reviewIdList,schedulesList,scheduleItems,reviewObJ,scheduleId}) => {
  /* 로그인 유저 정보 */
  const user = auth.currentUser
  let userId;
  if(user) {
    userId = user.uid
  }
 
  /* 하위 컴포넌트에 로그인 확인여부를 전달 */
  const [loginCheck,setLoginCheck] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setLoginCheck(true) : setLoginCheck(false)
    });
  },[user])

  /* 하위 컴포넌트(NavBar)에서 로그아웃 클릭시 state값을 전달받는 함수 */
  const logOutCheck =(check)=> {
    setLoginCheck(check)
    appLogoutCheck(check)
  }

  /* 렌더링할 테마 필터  */
  const [prodList, setProductList] = useState([]);
  const [query] = useSearchParams();
  const [data,setData] = useState(themeDb.theme)
  const dataAlignment = (data) => {
    setData(data)
  }
  const getProducts = async () => {
    if((query.get('q'))) {
      let filteredData = themeDb.theme.filter((item)=> item.title.toLowerCase().includes(query.get('q').toLowerCase()))
      setProductList(filteredData);
    } else {
      setProductList(data);
    }
  };
  useEffect(() => {
    getProducts();
  }, [query,data]);

  /* 지역,장르 필터 */
  let mainAreaName = useSelector(state => state.mainAreaName)
  let subAreaName = useSelector(state => state.subAreaName)
  let genreName = useSelector(state => state.genreName)
  const [filteredProduct,setfilteredProduct] = useState([]);
  const filteredArea = prodList.filter((item) => item.area.includes(mainAreaName));
  const filteredGenre = filteredArea.filter((item) => 
    item.subArea.includes(subAreaName) && item.genre.includes(genreName)
  )

  useEffect(() => {
    setfilteredProduct(filteredGenre);
  }, [mainAreaName,subAreaName, genreName, prodList]);

  const [showModal,setShowModal ] = useState(false)
  const [modalItem, setModalItem] = useState(null);
  const hideModal = (item) => {
    setShowModal(item)
  }

  /* 자식 컴포넌트에서 모달창 닫기버튼 */
  const getProdCardData = (targetThemeData) => {
    setModalItem(targetThemeData);
    setShowModal(!showModal)
  };

  /* 모달창이 마운트시 배경요소가 스크롤되는 것을 방지 */
  if(showModal === true) {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
  } else {
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }

  /* 검색결과 없을시 뒤로가기 기능 */
  const navigate = useNavigate();
  const searchInit = () => {
    navigate(-1)
  }

  return (
    <div className="productAllpage">
        <Navbar
          loginCheck={loginCheck}
          logOutCheck={logOutCheck}
          schedulesList={schedulesList}
          scheduleItems={scheduleItems}
        />
        <div className="topInnerWrap" id="productAllTopInner">
          <div className="inner">           
            <AreaList />
            <GenreList />
            <Alignment themeDb={themeDb.theme} dataAlignment={dataAlignment}/>
          </div>
        </div>

      <main style={{minHeight : window.innerHeight - 80 + "px"}}>
        <div className="inner">
          <div className="itemlistBox">
            {
              filteredGenre.length > 0
              ? filteredProduct.map((item, idx) => 
                <div className="itemWrap">
                  <ProductCard
                    item={item}
                    key={item.id}
                    onClick={getProdCardData}
                    getProdCardData={getProdCardData}
                    loginCheck={loginCheck}
                    userId={ user ? userId : ""}
                    likeIdList={likeIdList}
                  />
                </div>
              ) 
              : query.get('q') ? 
                <div className='failedMassage'>
                  <p className='result'>검색 결과 <span>' {query.get('q')} '</span> 이(가) 없습니다.</p>
                  <p className='backBtn'><span onClick={searchInit}>뒤로 가기</span></p>                
                </div>
                : <div className='failedMassage'>
                <p className='result'>해당 조건의 테마가 없습니다.</p>          
              </div>
            }
          </div>
        </div>
            {
              showModal
              ? <ProductModal
                  item={modalItem}
                  hideModal={hideModal}
                  loginCheck={loginCheck}
                  userId={ user ? userId : ''}
                  likeIdList={likeIdList}
                  reviewIdList={reviewIdList}
                  reviewObJ={reviewObJ}
                  scheduleItems={scheduleItems}
                  schedulesList={schedulesList}
                  scheduleId={scheduleId}
                />
              : ""
            }
      </main>
      <Footer />
    </div>
  );
}

export default ProductAll;
