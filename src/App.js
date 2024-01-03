import './App.css';
import {React, useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductAll from './page/productAll';
import MyPage from './page/myPage';
import Login from './page/login';
import SignUpPage from './page/signUpPage';
import TermsPage from './page/termsPage'
import {firestore,auth,onAuthStateChanged} from "./firebase-config"
import {collection,onSnapshot} from 'firebase/firestore';

function App() {
  const user = auth.currentUser
  const [userId,setUserId] = useState('')
  const [likeIdList,setLikeIdList] = useState([])
  const [reviewIdList,setReviewIdList] = useState([])
  const [reviewObJ,setReviewObj] = useState([])
  const [schedulesList,setSchedulesList] = useState([])
  const [scheduleItems, setScheduleItems] = useState([])
  const [scheduleId, setScheduleId] = useState([])
  const [logoutCheck,setLogoutCheck] = useState(false)

  const appLogoutCheck = (check) => {
    setLogoutCheck(check)
  }
  
  useEffect(() => {
    const userCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchUserLikeList(user.uid)
        fetchUserReviewList(user.uid)
        fetchUserScheduleList(user.uid)
      } else {
        setUserId("");
        setLikeIdList([])
        setReviewIdList([])
        setReviewObj([])
        setSchedulesList([])
        setScheduleItems([]) 
        setScheduleId([])
      }
    });
    return userCheck;
  }, [auth , logoutCheck]);

  const fetchUserLikeList = async (userId) => {
    try {
      const q = collection(firestore, userId, 'like', 'likeObj');
      const subscribe = onSnapshot(q, (querySnapshot) => {
        let likeIdArr = [];
        querySnapshot.forEach((doc) => {
          likeIdArr.push(doc.id);
        });
        setLikeIdList(likeIdArr);
      })
      return subscribe;
    } catch (error) {
        console.log("likeList get error")
    };
  }
  
  const fetchUserReviewList = async (userId) => {
    try {
      const q = collection(firestore, userId, 'review', 'reviewObj');
      const subscribe = onSnapshot(q, (querySnapshot) => {
        let reviewId = [];
        let reviewObj = [];
        querySnapshot.forEach((doc) => {
          reviewId.push(doc.id);
          reviewObj.push(doc.data());
        });
        setReviewIdList(reviewId);
        setReviewObj(reviewObj);
        return subscribe;
      })
    } catch (error) {
        console.log("reviewList get error")
    };
  };

  const fetchUserScheduleList = async (userId) => {
    try {
      const q = collection(firestore, userId, "schedule", "list" );
      const subscribe = onSnapshot(q, (querySnapshot) => {
        let dateArr = [];
        let itemsArr = [];
        let itemIdArr = [];
        querySnapshot.forEach((doc) => {
          dateArr.push(doc.data().date)
          itemsArr.push(doc.data())
          itemIdArr.push(doc.data().id)
        })
        setSchedulesList(dateArr)
        setScheduleItems(itemsArr)
        setScheduleId(itemIdArr)
        return subscribe
      })
    } catch (error) {
      console.log("shcedule get error")
    }
  }

  

  return (  
    <>
      <Routes>
        <Route path='/'
          element={
            <ProductAll
              likeIdList={likeIdList}
              appLogoutCheck={appLogoutCheck}
              uid={userId}
              reviewIdList={reviewIdList}
              reviewObJ={reviewObJ}
              schedulesList={schedulesList}
              scheduleItems={scheduleItems}
              scheduleId={scheduleId}
            />
          } 
        />

        <Route path='myPage'
          element={
            <MyPage
              likeIdList={likeIdList}
              uid={userId}
              reviewIdList={reviewIdList}
              reviewObJ={reviewObJ}
              schedulesList={schedulesList}
              scheduleItems={scheduleItems}
              scheduleId={scheduleId}
            />
          }
        />

        <Route path='loginPage' element={<Login />} />
        <Route path='signUpPage' element={<SignUpPage/>} />
        <Route path='termsPage' element={<TermsPage/>} />
      </Routes>
    </>
  );
}

export default App;
