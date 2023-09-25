import React from 'react';
import { useSelector } from 'react-redux';
import GrandSonbox from './GrandSonbox';

const Box = () => {
    let count = useSelector((state => state.count))
  return (
    <div>        
        <h2>This is a box!!</h2>
        <strong>{count}</strong>
        <GrandSonbox />
    </div>
  )
}

export default Box
