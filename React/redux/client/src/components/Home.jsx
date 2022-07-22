import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [LoginCheck, setLoginCheck] = useState(false);
  const [UserId, setUserId] = useState("");
  const navigate = useNavigate();

  const onClickHandler = () => {
    if(LoginCheck){
      navigate('/')
    }else{
      setLoginCheck(false);
      navigate('/login');
    }
  }

  useEffect(() => {
    axios.get('/api/users/auth')
      .then(res => setUserId(res._id))
      .catch(err => console.log(err));
  })

  return (
    <div className='home center'>
      <h2>로그인, 회원가입 시스템</h2>
      { UserId == "" ? "" : <h3>환영합니다, {UserId} 님.</h3> }
      <button onClick={onClickHandler}>{LoginCheck ? "로그아웃" : "로그인"}</button>
    </div>
  )
}

export default Home