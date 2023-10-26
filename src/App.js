import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductAll from './page/ProductAll';
import MyPage from './page/MyPage';


function App() {
  return (  
    <>
      <Routes>
        <Route path='/' element={<ProductAll />} />
        <Route path='myPage' element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
