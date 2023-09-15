import React from 'react'
import { useParams } from 'react-router-dom';

const Info = (props) => {
    let {id} = useParams();

    return (
        <div className='itemInfo'>      
            <figure>
                <img className='img' src={process.env.PUBLIC_URL + props.item[id].img} alt={props.item[id].imgAlt} />
            </figure>
            <div className='text'>
                <p className='name'>{props.item[id].name}</p>
                <p className='genre'>장르 : {props.item[id].genre}</p>
                <p className='store'>매장명 : {props.item[id].store}</p>
                <p className='ike'>평점 : {props.item[id].like}</p>
                <p className='info'>테마정보</p>
                <p className='infoText'>{props.item[id].info}</p>
            </div>
        </div>
    )
}

export default Info
