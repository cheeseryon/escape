import React , { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {firestore} from "../firebase-config"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import moment from 'moment';

const CalendarC = ({cancelBtn , item, userId, getScheduleByDate, scheduleItems}) => {
    const [value , onChange] = useState(new Date())
    const yearMonthDay = moment(value).format('YYYY-MM-DD');
    const alretDay = moment(value).format('MM월DD일');
    const [selectedHour, setSelectedHour] = useState("00");
    const [selectedMinute, setSelectedMin] = useState("00");
    const [hourOptionBox , setHourOptionBox] =useState(false)
    const [minOptionBox , setMinOptionBox] =useState(false)

    /* 상위 컴포넌트로 날짜 전달 */
    useEffect(() => {
        getScheduleByDate(yearMonthDay)
    },[yearMonthDay])

    /* 인풋에 입력된 값으로 변경 */
    const changeInputHour = (e) => {setSelectedHour(e.target.value)};
    const changeInputMin = (e) => {setSelectedMin(e.target.value)};

     /* 포커스 됐을 떄 옵션창 열기*/
    const hourInputFocus = () => {setHourOptionBox(true)}
    const minInputFocus = () => {setMinOptionBox(true)}

    /* 포커스 아웃 됐을 때 옵션창 닫기 */
    window.addEventListener("click" , (e) => {
        let minTarget = e.target.closest('#min')
        let hourTarget = e.target.closest('#hour')
     
        if (!hourTarget) {
            setHourOptionBox(false)
        }
        if (!minTarget) {
            setMinOptionBox(false)
        }
    })

    /* 옵션창에서 선택된 값으로 변경 */
    const changeSelectedHour = (e) => {
        setSelectedHour(e.target.dataset.index)
        setHourOptionBox(false)
    }
    const changeSelectedMin = (e) => {
        setSelectedMin(e.target.dataset.index)
        setMinOptionBox(false)
    }

    const sendScheduleToServer = async () => {
        try {
            let msg = window.confirm(`${alretDay} ${selectedHour}시${selectedMinute}분 [ ${item.title} ] 테마를 일정에 등록하시겠습니까?`)
            if(msg) {
                const scheduleRef = await setDoc(doc(firestore, userId, "schedule", "list", item.id), {
                    id: item.id,
                    img: item.img,
                    title: item.title,
                    store: item.store,
                    site: item.site,
                    genre: item.genre,
                    time: item.time,
                    area: item.area,
                    subArea: item.subArea,
                    difficulty: item.difficulty,
                    story: item.story,
                    timestp: serverTimestamp(),
                    date: yearMonthDay,
                    startTime: `${selectedHour}:${selectedMinute}`
                })
                cancelBtn(false)
            }
        } catch(error) {
            console.log("")
        }
    }

    const addScheduleCancel = () => {
        let msg = window.confirm("일정 등록을 취소하겠습니까?")
        if(msg) {
            cancelBtn(false)
        }
    }

  return (
    <div className="calComponent">
        <Calendar
            value={value} 
            className="calendar"
            onChange={onChange}
            tileContent={({ date }) => {
                let filteredItem = scheduleItems.filter((x) => x.date === moment(date).format('YYYY-MM-DD'))
                
                return (    
                    filteredItem.length > 0         
                    ? <div className="mark">
                        {filteredItem.map((item) => (<span>!</span>))}         
                    </div>
                    : ''
                );
            }}
            calendarType="US"
            formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
        />  
        <div className="timeInputArea">
            <div>
                <p >시작 시간</p>   
                <div id="hour" className="inputBox">
                    <input type="number" value={selectedHour} onChange={changeInputHour} onFocus={hourInputFocus} /> 
                    {   
                    hourOptionBox 
                    ? <div id="hourSelect" className="optionSelected">
                        {
                            Array.from({length:23}, (_, i) => (
                                <p key={i + 1} value={i + 1} data-index={i + 1} onClick={(e) => changeSelectedHour(e)}>{i + 1}</p>
                            ))
                        }
                    </div>
                    : ''
                    }
                </div>

                <span>:</span>

                <div id="min" className="inputBox">
                    <input type="number" value={selectedMinute} onChange={changeInputMin} onFocus={minInputFocus} /> 
                    {   
                    minOptionBox 
                    ? <div id="minSelect" className="optionSelected">
                        {
                            Array.from({length:12}, (_, i) => (
                                <p key={i * 5} value={i* 5} data-index={i* 5} onClick={(e) => changeSelectedMin(e)}>{i * 5}</p>
                            ))
                        }
                    </div>
                    : ''
                    }
                </div>
            </div>
        </div>

        <div className="bottomBtnArea">
            <div>
                <span onClick={sendScheduleToServer}>저장</span>
                <span onClick={addScheduleCancel}>닫기</span>
            </div>
        </div>
    </div>
  )
}

export default CalendarC
  