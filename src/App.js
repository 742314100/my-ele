import React from 'react';
import './App.css';
import API from './api/api'
import {Button} from 'antd'

function App() {

  let getUserInfo=async()=>{
    let userInfo=await API.getUser({user_id:111})
    console.log(userInfo)
  }

  getUserInfo()

  return (
    <div className="App">
            11
        <Button type="primary">antd</Button>
    </div>
  );
}

export default App;
