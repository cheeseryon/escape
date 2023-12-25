import './App.css';
import {React, useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductAll from './page/ProductAll';
import MyPage from './page/MyPage';
import Login from './page/Login';
import Account from './page/Account';
import {firestore, auth, onAuthStateChanged } from "./firebase-config"
import { doc, collection, getDocs , onSnapshot} from 'firebase/firestore';

function App() {
  const user = auth.currentUser
  const [userId,setUserId] = useState('')
  const [likeIdList,setLikeIdList] = useState([])
  const [recordedIdList,setRecordedIdList] = useState([])
  const [schedulesList,setSchedulesList] = useState([])
  const [scheduleItems, setScheduleItems] = useState([])
  const [logoutCheck,setLogoutCheck] = useState(false)

  const appLogoutCheck = (check) => {
    setLogoutCheck(check)
  }

  useEffect(() => {
    const userCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchUserLikeList(user.uid)
        fetchUserRecordedList(user.uid)
        fetchUserScheduleList(user.uid)
      } else {
        setUserId("");
        setLikeIdList([])
        setRecordedIdList([])
        fetchUserScheduleList([])
        setScheduleItems([])
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
  
  const fetchUserRecordedList = async (userId) => {
    try {
      const q = collection(firestore, userId, 'record', 'recordedObj');
      const subscribe = onSnapshot(q, (querySnapshot) => {
        let recordedIdArr = [];
        querySnapshot.forEach((doc) => {
          recordedIdArr.push(doc.id);
        });
        setRecordedIdList(recordedIdArr);
        return subscribe;
      })
    } catch (error) {
        console.log("recordedList get error")
    };
  };

  const fetchUserScheduleList = async (userId) => {
    try {
      const q = collection(firestore, userId, "schedule", "list");
      const subscribe = onSnapshot(q, (querySnapshot) => {
        let schedulsArr = [];
        let itemsArr = [];
        querySnapshot.forEach((doc) => {
          schedulsArr.push(doc.id)
          itemsArr.push(doc.data())
        })
        setSchedulesList(schedulsArr)
        setScheduleItems(itemsArr)
        return subscribe
      })
    } catch (error) {
      console.log("스케줄 문서 에러")
    }
  }

  console.log(scheduleItems)
  return (  
    <>
      <Routes>
        <Route path='/'
          element={
            <ProductAll
              likeIdList={likeIdList}
              appLogoutCheck={appLogoutCheck}
              uid={userId}
              recordedIdList={recordedIdList}
              schedulesList={schedulesList}
              scheduleItems={scheduleItems}/>
          } 
        />

        <Route path='myPage'
          element={
            <MyPage
              likeIdList={likeIdList}
              uid={userId}
              recordedIdList={recordedIdList}
              schedulesList={schedulesList}
              scheduleItems={scheduleItems}/>
          }
        />

        <Route path='loginPage' element={<Login />} />
        <Route path='account' element={<Account/>} />
      </Routes>
    </>
  );
}

export default App;
