import './App.css';
import Home from './Home/Home'
import Login from './Login/Login';
import { Spin } from 'antd'
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

function App() {
  let [login, setLogin] = useState(false);
  let [userInfo, setUserInfo] = useState({});
  let [loading, setLoading] = useState(true);

  const hasLogin = useCallback(() => {
    let name = getCookie('username');
    if (name) {
      let power = getCookie('power');
      return { name, userType: power };
    } else {
      return false;
    }
  }, []);

  useEffect(() => {
    let result = hasLogin();
    if (result) {
      setLoading(false);
      setLogin(true);
      setUserInfo(result)
    } else {
      setLoading(false);
    }
  }, [hasLogin]);


  function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) { return c.substring(name.length, c.length); }
    }
    return "";
  }



  function loginSuccess({ username, userType }) {
    setUserInfo({ name: username, userType });
    setLogin(true);
  }

  function setLogOut() {
    setCookie('username', '', -1);
    setCookie('power', '', -1);
    setLogin(false);
    setUserInfo({});
  }

  return (
    <div className='Home'>
      {loading && <div className='loading' style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center'
      }}>
        <Spin></Spin>
        <div style={{ fontSize: '30px' }}>Please wait</div>
      </div>}
      {!login && !loading && <Login loginSuccess={loginSuccess} />}
      {login && !loading && <Home user={userInfo} setLogOut={setLogOut}></Home>}
    </div>
  )
}

export default App;
