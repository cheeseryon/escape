import { Container } from 'react-bootstrap';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductAll from './page/ProductAll';
import ProductDetail from './page/ProductDetail';
import LoginPage from './page/LoginPage';
/* import UserPage from './page/UserPage'; */
import Navbar from './component/Navbar';
import { useEffect, useState } from 'react';
import PrivateRoute from './route/PrivateRoute';

//1. 전체상품 페이지/로그인/상품상세페이지
//1-1 네비게이션바
//2. 전체상품페이지에서는 기본 상품이 진열됨

//3. 로그인 버튼을 클릭하면 로그인 페이지 나옴

//3. 상품을 클릭했을 때 로그인 상태면 -> 상세페이지가 보이고 로그인 상태가 아니면 -> 로그인 페이지가 보이도록 함.


function App() {
  const [authenticate, setAuthenticate] = useState(false);
  useEffect(()=> {
    console.log(authenticate);
  },[authenticate])

  return (  
    <Container>
      <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate}/>
      <Routes>
        <Route path='/' element={<ProductAll />} />
       {/*  <Route path='/product/:id' element={<ProductDetail />} /> */}

        <Route path='/product/:id' element={<PrivateRoute authenticate={authenticate}/>} />

        <Route path='/login' element={<LoginPage setAuthenticate={setAuthenticate}/>} />
{/*         <Route path='/user' element={<UserPage />} /> */}
      </Routes>
    </Container>
  );
}

export default App;
