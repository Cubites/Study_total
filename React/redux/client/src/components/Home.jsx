import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [LoginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if(LoginCheck){
      navigate('/')
    }else{
      setLoginCheck(false);
      navigate('/login');
    }
  }
  return (
    <div className='home center'>
      <h2>로그인, 회원가입 시스템</h2>
      <button onClick={onClickHandler}>{LoginCheck ? "로그아웃" : "로그인"}</button>
    </div>
  )
}

export default Home